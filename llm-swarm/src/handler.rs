use axum::Json;
use inference::{InferRequest, InferResponse};
use serde_json::json;

pub async fn handle_infer(Json(payload): Json<InferRequest>) -> Json<InferResponse> {
    let response_body = match inference::inference(payload.prompt).await {
        Ok(val) => InferResponse {
            status: "success".to_string(),
            data: val,
        },
        Err(err_msg) => InferResponse {
            status: "error".to_string(),
            data: json!({ "message": err_msg }),
        },
    };

    Json(response_body)
}
