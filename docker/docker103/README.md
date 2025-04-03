```bash
docker compose up --build

curl -X GET --output - http://127.0.0.1:8080/get-counter
curl -X POST --output - http://127.0.0.1:8080/increment
curl -X POST --output - http://127.0.0.1:8080/decrement
```