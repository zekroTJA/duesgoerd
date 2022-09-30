use std::env;

mod ws;

fn main() {
    let bind_addr = env::var("DG_BINDADDRESS").unwrap_or_else(|_| "0.0.0.0:80".into());
    let allowed_origins = env::var("DG_ALLOWEDORIGINS").unwrap_or_else(|_| "*".into());

    env_logger::init();
    async_std::task::block_on(ws::run(&bind_addr, &allowed_origins)).expect("WS init failed");
}
