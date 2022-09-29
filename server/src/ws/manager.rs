use super::{client::Client, errors::Error, limiter::Limiter, models::*};
use anyhow::{anyhow, bail};
use async_std::{
    net::SocketAddr,
    sync::{RwLock, RwLockUpgradableReadGuard},
};
use async_tungstenite::tungstenite::Message;
use log::debug;
use serde::Serialize;
use std::{collections::HashMap, sync::Arc, time::Duration};

const CLEANUP_INTERVAL: Duration = Duration::from_secs(5 * 60);
const RATELIMIT_CAP: u32 = 10;
const RATELIMIT_DURATION: Duration = Duration::from_secs(5);

pub struct Manager {
    clients: RwLock<HashMap<SocketAddr, Client>>,
    limiter: Arc<Limiter<SocketAddr>>,
}

impl Manager {
    pub fn new() -> Self {
        let limiter = Arc::new(Limiter::new(RATELIMIT_CAP, RATELIMIT_DURATION));

        let cleanup_limiter = limiter.clone();
        async_std::task::spawn(async move {
            loop {
                async_std::task::sleep(CLEANUP_INTERVAL).await;
                let deleted_keys = cleanup_limiter.cleanup().await;
                debug!("Cleaned up {deleted_keys} limiters")
            }
        });

        Manager {
            clients: RwLock::new(HashMap::new()),
            limiter,
        }
    }

    pub async fn register(&self, peer: SocketAddr, client: Client) {
        debug!("Client registered: {peer}");
        let mut clients = self.clients.write().await;
        clients.insert(peer, client);
    }

    pub async fn unregister(&self, peer: &SocketAddr) -> anyhow::Result<()> {
        debug!("Client unregistered: {peer}");

        let clients = self.clients.upgradable_read().await;
        if let Some(client) = clients.get(peer) {
            if let Some(display_name) = client.display_name() {
                self.broadcast_to_others(
                    Event {
                        code: EventCode::Left,
                        payload: Some(LeftEvent {
                            display_name: display_name.to_owned(),
                        }),
                    },
                    peer,
                )
                .await?;
            }

            let mut clients = RwLockUpgradableReadGuard::upgrade(clients).await;
            clients.remove(peer);
        }

        Ok(())
    }

    pub async fn handle_message(&self, peer: SocketAddr, msg: Message) -> anyhow::Result<()> {
        let map = self.clients.upgradable_read().await;
        let client = map.get(&peer);
        if client.is_none() {
            bail!("no client registered with this address");
        }
        let client = client.unwrap();

        if !self.limiter.take(peer).await {
            client.send(&ErrorCode::RateLimitExceeded.into()).await?;
            return Ok(());
        }

        let code = deserialize::<OperationCode>(msg.clone())?.code;
        debug!("OP CODE: {:#?}", code);

        match code {
            OpCode::Join => {
                if client.display_name().is_some() {
                    client.send(&ErrorCode::RateLimitExceeded.into()).await?;
                    return Ok(());
                }
                let display_name = deserialize::<Operation<JoinOperation>>(msg)?
                    .payload
                    .map_or(Err(anyhow!("no display name provided")), Ok)?
                    .display_name;
                let taken = map.iter().any(|(_, c)| {
                    c.display_name().is_some() && c.display_name().unwrap().eq(&display_name)
                });
                if taken {
                    return client.send(&ErrorCode::DisplayNameTaken.into()).await;
                }
                {
                    let mut map = RwLockUpgradableReadGuard::upgrade(map).await;
                    let client = map
                        .get_mut(&peer)
                        .map_or(Err(anyhow!("client seems to be disappered")), Ok)?;
                    client.set_display_name(display_name.clone());
                }
                self.broadcast_to_others(
                    Event {
                        code: EventCode::Joined,
                        payload: Some(JoinedEvent { display_name }),
                    },
                    &peer,
                )
                .await?;
            }

            OpCode::Message => {
                if client.display_name().is_none() {
                    client.send(&ErrorCode::NotJoined.into()).await?;
                    return Ok(());
                }
                let message = deserialize::<Operation<MessageOperation>>(msg)?
                    .payload
                    .unwrap_or(MessageOperation { message: "".into() })
                    .message;
                let message = message.trim();
                if message.is_empty() {
                    client.send(&ErrorCode::NotJoined.into()).await?;
                    return Ok(());
                }
                self.broadcast(
                    Event {
                        code: EventCode::Message,
                        payload: Some(MessageEvent {
                            display_name: client.display_name().unwrap().to_owned(),
                            message: message.into(),
                        }),
                    },
                    None,
                )
                .await?;
            }

            _ => client.send(&ErrorCode::InvalidOperation.into()).await?,
        }

        Ok(())
    }

    #[allow(dead_code)]
    pub async fn send<T>(&self, peer: &SocketAddr, event: Event<T>) -> anyhow::Result<()>
    where
        T: Serialize,
    {
        if let Some(client) = self.clients.read().await.get(peer) {
            client.send(&event).await?;
            return Ok(());
        }

        Err(Error::UnregisteredClient.into())
    }

    pub async fn broadcast<T>(
        &self,
        event: Event<T>,
        ignore: Option<Vec<&SocketAddr>>,
    ) -> anyhow::Result<()>
    where
        T: Serialize,
    {
        let clients = self.clients.read().await;
        let res = clients
            .iter()
            .filter(|(addr, c)| {
                c.display_name().is_some() && ignore.is_none()
                    || matches!(&ignore, Some(i) if !i.contains(addr))
            })
            .map(|(_, client)| client.send(&event));
        futures::future::join_all(res)
            .await
            .into_iter()
            .find(|r| r.is_err())
            .unwrap_or(Ok(()))?;
        Ok(())
    }

    pub async fn broadcast_to_others<T>(
        &self,
        event: Event<T>,
        me: &SocketAddr,
    ) -> anyhow::Result<()>
    where
        T: Serialize,
    {
        self.broadcast(event, Some(vec![me])).await
    }
}
