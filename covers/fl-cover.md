Hi,

I’m Abhinav Agarwalla, currently focused on peer-to-peer networking and protocol design, particularly within the libp2p ecosystem.

Over the past year, I’ve been contributing actively to py-libp2p, working across core protocol layers — from transport and security (Noise/TLS, pnet) to peer records, pubsub, and peerstore design. A lot of my work has been around interoperability and bringing Python implementations closer to parity with go-libp2p, which has given me a fairly deep understanding of how these systems behave under real network conditions.

In parallel, I’ve been building rnet (https://github.com/lla-dane/rnet), an experimental P2P stack in Rust. The goal there is to learn more about internal p2p mechanics and complex rust async patterns — I’ve implemented identity, transport, secure channels (Diffie-Hellman + ChaCha20-Poly1305), stream multiplexing, and basic protocols like floodsub from scratch. This has been my way of understanding the trade-offs behind libp2p’s design decisions by re-deriving them.

I’ve also explored adjacent areas like QUIC transport internals, protocol-level latency behavior, and large-scale peerstore performance, and I’m particularly interested in problems around transport efficiency, protocol composition, and cross-implementation interoperability.

Outside of pure infra work, I’ve built systems like a P2P federated learning network(https://github.com/lla-dane/P2P-Federated-Learning) (ETHGlobal New Delhi winner, Filecoin track), where I used libp2p for coordination and decentralized data exchange. But my long-term focus is clearly on core networking and protocol infrastructure.

I’m looking to contribute in areas where low-level networking, distributed systems, and real-world protocol constraints intersect — especially within the broader libp2p/Filecoin stack.

Would love to explore where I can contribute meaningfully.

Thanks,
Abhinav

