use std::env;

use dotenv::dotenv;
use reqwest::blocking::Client;
use serde_json::{Value, json};
fn main() {
    dotenv().ok();
    let api_key = env::var("HF_API_KEY").expect("API key not set");
    let model = env::var("MODEL").expect("Model not set");
    let api_url = format!("https://api-inference.huggingface.co/models/{}", model);

    let client = Client::new();

    let payload = json!({
        "inputs": "Do you think Thanos was right in wiping out 50% of living beings ?"
    });

    let response = client
        .post(&api_url)
        .header("Authorization", format!("Bearer {}", api_key))
        .json(&payload)
        .send();

    match response {
        Ok(resp) => {
            if resp.status().is_success() {
                let json_resp: Value = resp
                    .json()
                    .unwrap_or_else(|_| json!({"error": "Invalid JSON"}));
                println!("Response: {:?}", json_resp);
            } else {
                println!("Error: HTTP {}", resp.status());
                println!(
                    "Response Body: {:?}",
                    resp.text()
                        .unwrap_or_else(|_| "Failed to read response body".to_string())
                );
            }
        }
        Err(e) => println!("Request failed: {}", e),
    }
}
