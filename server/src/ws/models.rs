use async_tungstenite::tungstenite::Message;
use serde::{de::DeserializeOwned, Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum OpCode {
    Join,
    Leave,
    Message,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OperationCode {
    pub code: OpCode,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Operation<T> {
    pub code: OpCode,
    pub payload: Option<T>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct JoinOperation {
    pub display_name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct MessageOperation {
    pub message: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum EventCode {
    Error,
    Joined,
    Left,
    Message,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Event<T> {
    pub code: EventCode,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub payload: Option<T>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct JoinedEvent {
    pub display_name: String,
}

pub type LeftEvent = JoinedEvent;

#[derive(Serialize, Deserialize, Debug)]
pub struct MessageEvent {
    pub display_name: String,
    pub message: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum ErrorCode {
    InvalidOperation,
    DisplayNameTaken,
    DisplayNameAlreadySet,
    RateLimitExceeded,
    NotJoined,
    EmptyMessage,
}

impl Event<ErrorEvent> {
    fn new(code: ErrorCode, msg: &str) -> Self {
        Event::<ErrorEvent> {
            code: EventCode::Error,
            payload: Some(ErrorEvent {
                code,
                message: Some(msg.to_string()),
            }),
        }
    }
}

impl From<ErrorCode> for Event<ErrorEvent> {
    fn from(code: ErrorCode) -> Self {
        match code {
            ErrorCode::InvalidOperation => Event::<ErrorEvent>::new(code, "Invalid operation"),
            ErrorCode::DisplayNameTaken => {
                Event::<ErrorEvent>::new(code, "Display name is already taken")
            }
            ErrorCode::DisplayNameAlreadySet => {
                Event::<ErrorEvent>::new(code, "Display name is already set")
            }
            ErrorCode::RateLimitExceeded => Event::<ErrorEvent>::new(code, "Rate limit exceeded"),
            ErrorCode::NotJoined => Event::<ErrorEvent>::new(code, "You have not joined the chat"),
            ErrorCode::EmptyMessage => Event::<ErrorEvent>::new(code, "The sent message is empty"),
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ErrorEvent {
    code: ErrorCode,
    #[serde(skip_serializing_if = "Option::is_none")]
    message: Option<String>,
}

pub fn deserialize<T>(msg: Message) -> anyhow::Result<T>
where
    T: DeserializeOwned,
{
    let res = serde_json::de::from_str(msg.to_string().as_str())?;
    Ok(res)
}

pub fn serialize<T>(v: &T) -> anyhow::Result<String>
where
    T: Serialize,
{
    let res = serde_json::ser::to_string(&v)?;
    Ok(res)
}
