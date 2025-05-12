FROM rust:bookworm as builder
WORKDIR /app/ping-rs
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
RUN ls 
COPY --from=builder /app/ping-rs/target/release/ping-rs /usr/local/bin/ping-rs
EXPOSE 5000
CMD ["ping-rs"]