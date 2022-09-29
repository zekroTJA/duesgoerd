mod client;
mod errors;
mod limiter;
mod manager;
mod models;

use crate::ws::{client::Client, manager::Manager};
use async_std::{
    channel::unbounded,
    net::{SocketAddr, TcpListener, TcpStream},
};
use async_tungstenite::{
    accept_hdr_async,
    tungstenite::{
        self,
        handshake::server::{Request, Response},
        http::header::{
            ACCESS_CONTROL_ALLOW_HEADERS, ACCESS_CONTROL_ALLOW_METHODS, ACCESS_CONTROL_ALLOW_ORIGIN,
        },
    },
};
use futures::prelude::*;
use log::{debug, error, info};
use std::sync::Arc;

async fn accept_connection(manager: Arc<Manager>, peer: SocketAddr, stream: TcpStream) {
    if let Err(e) = handle_connection(&manager, peer, stream).await {
        match e {
            err if e.is::<tungstenite::Error>() => {
                match err.downcast_ref::<tungstenite::Error>().unwrap() {
                    tungstenite::Error::ConnectionClosed
                    | tungstenite::Error::Protocol(_)
                    | tungstenite::Error::Utf8 => (),
                    err => error!("Error processing connection: {}", err),
                }
            }
            e => error!("Error processing connection: {}", e),
        }
    }
    manager
        .unregister(&peer)
        .await
        .unwrap_or_else(|e| error!("Unregistering client failed: {e}"));
}

async fn handle_connection(
    manager: &Manager,
    peer: SocketAddr,
    stream: TcpStream,
) -> anyhow::Result<()> {
    let (ws_sender, mut ws_receiver) =
        accept_hdr_async(stream, |_: &Request, mut res: Response| {
            let headers = res.headers_mut();
            headers.insert(ACCESS_CONTROL_ALLOW_ORIGIN, "*".parse().unwrap());
            headers.insert(ACCESS_CONTROL_ALLOW_HEADERS, "*".parse().unwrap());
            headers.insert(ACCESS_CONTROL_ALLOW_METHODS, "*".parse().unwrap());
            Ok(res)
        })
        .await?
        .split();

    info!("New WebSocket connection: {}", peer);

    let (client_sender, client_receiver) = unbounded();
    async_std::task::spawn(client_receiver.forward(ws_sender));

    let client = Client::new(client_sender);
    manager.register(peer, client).await;

    while let Some(msg) = ws_receiver.next().await {
        let msg = msg?;
        if msg.is_text() || msg.is_binary() {
            debug!("<== {msg}");
            manager.handle_message(peer, msg).await?;
        }
    }

    Ok(())
}

pub async fn run(addr: &str) -> anyhow::Result<()> {
    let listener = TcpListener::bind(&addr).await?;
    info!("Listening on: {}", addr);

    let manager = Arc::new(Manager::new());

    while let Ok((stream, _)) = listener.accept().await {
        let peer = match stream.peer_addr() {
            Ok(v) => v,
            Err(err) => {
                error!("could not get peer address: {err}");
                continue;
            }
        };
        info!("Peer address: {}", peer);

        let manager = manager.clone();
        async_std::task::spawn(accept_connection(manager, peer, stream));
    }

    Ok(())
}
