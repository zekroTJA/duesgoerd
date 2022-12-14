use std::fmt::Display;

#[derive(Debug)]
pub enum Error {
    UnregisteredClient,
}

impl Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Error::UnregisteredClient => write!(f, "unregistered client for this peer address"),
        }
    }
}

impl std::error::Error for Error {}
