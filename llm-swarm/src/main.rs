use axum::{routing::post, Router};
use log::info;
mod handler;

extern crate inference;

fn init() {
    dotenv::dotenv().ok();
    unsafe {
        std::env::set_var("RUST_LOG", "trace");
    }
    env_logger::init();
}

#[tokio::main]
async fn main() {
    init();
    let app = Router::new().route("/infer", post(handler::handle_infer));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();

    info!("Server listening at port 8080..");
    axum::serve(listener, app).await.unwrap();
}
