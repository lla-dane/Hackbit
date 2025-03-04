use reqwest::Client;
use std::env;

use serde::{Deserialize, Serialize};
use serde_json::{self, json, Value};

#[derive(Deserialize)]
pub struct InferRequest {
    pub prompt: String,
}

#[derive(Serialize)]
pub struct InferResponse {
    pub status: String,
    pub data: Value,
}

pub async fn inference(prompt: String) -> Result<Value, String> {
    let api_key = env::var("HF_API_KEY").expect("API key not set");
    let model = env::var("MODEL").expect("Model not set");
    let api_url = format!("https://api-inference.huggingface.co/models/{}", model);

    let client = Client::new();
    let payload = json!({ "inputs": prompt });

    let response = client
        .post(&api_url)
        .header("Authorization", format!("Bearer {}", api_key))
        .json(&payload)
        .send()
        .await;

    match response {
        Ok(resp) => {
            if resp.status().is_success() {
                let mut json_resp: Value = resp
                    .json()
                    .await
                    .unwrap_or_else(|_| json!({"error": "Invalid JSON"}));

                // Remove the repeated promt from the repsonse
                if let Some(data_array) = json_resp.as_array_mut() {
                    if let Some(obj) = data_array.get_mut(0) {
                        if let Some(text) = obj.get("generated_text").and_then(|t| t.as_str()) {
                            let clean_text = text
                                .strip_prefix(&prompt)
                                .unwrap_or(text)
                                .trim()
                                .to_string();
                            obj["generated_text"] = Value::String(clean_text);
                        }
                    }
                }
                Ok(json_resp)
            } else {
                Err(resp
                    .text()
                    .await
                    .unwrap_or_else(|_| "Unknown error".to_string()))
            }
        }
        Err(e) => Err(format!("Request failed: {}", e)),
    }
}
