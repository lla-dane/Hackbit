```bash
./infer-service

ngrok http 8080

curl -X POST "https://e60a-2409-40e3-319c-525-da74-6849-5a05-d898.ngrok-free.app/infer" -H "Content-Type: application/json" -d '{"message": "What do you about blockchain?"}'
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
