```bash
./infer-service

ngrok http 8080

curl -X POST "https://3d55-2409-40e5-10a1-9e26-c27-c819-331a-6cd.ngrok-free.app/infer" -H "Content-Type: application/json" -d '{"message": "What do you about blockchain?"}'
```

```
http http://localhost:8080/infer prompt="Hey, hello"

http https://661c-2409-40e5-10a1-9e26-c27-c819-331a-6cd.ngrok-free.app/infer prompt="Hey, what can you tell me about blockchain?"
```

#### For running a model locally by downloading from huggingface, with complete GPU optimization :-

- Download the model using the cli

```bash
# In ~/model
huggingface-cli download <MODEL-NAME> <FILE-NAME/VERSION>
ls ~/model
```

- Build the llama.cpp repo from source with CUDA support

```bash
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
mkdir build
cd build
cmake .. -DGGML_CUDA=ON
cmake --build . --config Release
```

- Run the model locally at port 8080 with llama-server

```bash
# pwd: /home/lla-dane/llama.cpp/build/bin
./llama-server -m /home/lla-dane/model/<MODEL-NAME> --n-gpu-layers 50
```

- Monitor

```bash
# Monitor the GPU from the terminal
gpustat -i
```

```bash
# Long command (GPU)
./llama.cpp/build/bin/llama-server -m /home/lla-dane/model/Hermes-2-Pro-Llama-3-8B-Q4_K_M.gguf --n-gpu-layers 50

# Long command (CPU)
./llama.cpp/build/bin/llama-server -m /home/lla-dane/model/Hermes-2-Pro-Llama-3-8B-Q4_K_M.gguf
```

- Make a POST request directly from the terminal like this

```bash
curl -X POST http://127.0.0.1:8080/completion \
     -H "Content-Type: application/json" \
     -d '{
           "prompt": "Hello, how are you?",
           "n_predict": 200
         }'
```

```zsh
 curl -X POST https://curated.aleph.cloud/vm/84df52ac4466d121ef3bb409bb14f315de7be4ce600e8948d71df6485aa5bcc3/completion \
     -H "Content-Type: application/json" \
     -d '{
           "prompt": "Hello, how are you?",
           "n_predict": 200
         }'
```
