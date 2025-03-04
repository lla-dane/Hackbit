```bash
./infer-service

ngrok http 8080

curl -X POST "https://e60a-2409-40e3-319c-525-da74-6849-5a05-d898.ngrok-free.app/infer" -H "Content-Type: application/json" -d '{"message": "What do you about blockchain?"}'
```