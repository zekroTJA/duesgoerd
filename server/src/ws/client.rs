use async_std::channel::Sender;
use async_tungstenite::tungstenite::{Error, Message};
use serde::Serialize;

use super::models::{serialize, Event};

pub struct Client {
    sender: Sender<Result<Message, Error>>,
    display_name: Option<String>,
}

impl Client {
    pub fn new(sender: Sender<Result<Message, Error>>) -> Self {
        Client {
            sender,
            display_name: None,
        }
    }

    pub async fn send<T>(&self, event: &Event<T>) -> anyhow::Result<()>
    where
        T: Serialize,
    {
        let msg = serialize(event)?;
        self.sender.send(Ok(Message::Text(msg))).await?;
        Ok(())
    }

    pub fn display_name(&self) -> Option<&String> {
        self.display_name.as_ref()
    }

    pub fn set_display_name(&mut self, display_name: String) {
        self.display_name = Some(display_name);
    }
}
