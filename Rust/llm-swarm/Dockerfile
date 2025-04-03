# Build the Rust app

FROM rust:bookworm as builder

RUN apt update && apt install -y \
    libssl-dev \
    pkg-config \
    build-essential \
    musl-tools

WORKDIR /app
COPY . .

RUN cargo build --release

# Create a small runtime image
FROM debian:bookworm-slim

RUN apt update && apt install -y \
    libssl-dev \
    pkg-config \
    build-essential \
    musl-tools

# Copy the compiled RUST binary from the builder stage
COPY --from=builder /app/target/release/llm-swarm /usr/local/bin/llm-swarm

CMD ["llm-swarm"]