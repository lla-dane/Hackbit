FROM rust:bookworm

RUN apt update && apt install -y \
    libssl-dev \
    pkg-config \
    build-essential \
    musl-tools

WORKDIR /app
COPY . .

RUN cargo build --release

CMD ["cargo", "run", "--release"]
