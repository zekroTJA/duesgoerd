mod ws;

fn main() {
    env_logger::init();
    async_std::task::block_on(ws::run("127.0.0.1:8080")).expect("WS init failed");
}
