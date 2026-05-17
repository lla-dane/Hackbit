One project I am particularly proud of is rnet (https://github.com/lla-dane/rnet), an experimental p2p networking stack that I have been building to get in deep with internal p2p mechanics and complex rust async patterns.

The motivation came from contributing to the existing p2p libraries in the libp2p ecosystem (https://github.com/libp2p/py-libp2p) where a lot of complexity is abstracted away by the senior contributors in the beginning only. I wanted to go beyond the outer layer services and actually understand how transports, secure channels, multiplexing, and protocol execution fit together -- especially in complex rust async environments.

I designed rnet by separating the crates for modularity, like identity, transport, security, multiplexing, protocol negotiation, and application protocols. 

At the transport layer, tcp sockets are used for connection handling, for security the upgrader performs a Diffie-Hellman key exchange to establish encrypted and authenticated channels. Then Mplex stream multiplexing logic was used to establish multiple logical stream in a single socket-connection with proper framing, stream lifecycle management, and backpressure handling. 

One of the more interesting challenges was getting protocol multiplexing to work cleanly with async Rust. I wrote a multistream based protocol negotiation pipeline, and built 2 protocols -- floodsub and ping -- that run concurrently over the same connection. This required careful handling if stream routing, concurrency, and avoiding deadlocks in the async execution loop. 

At the top layer, I built a swarm and node abstraction to manage connections and route protocol streams, effectively simulating how read P2P nodes coordinate communication. 

This project gave me a much deep understanding of networking internals, async system design in Rust, and tradeoffs involved in building modular, extensible protocol stacks.
