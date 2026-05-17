I'm a Mathematics and Computing undergrad at IIT Varanasi, primarily focused on peer-to-peer networking, distributed systems, and blockchain infrastructure.

Languages & Tools: Rust, Python, Go (reading/reference), Docker, Prometheus, Wireguard. I work primarily at the systems level — async I/O, protocol implementation, cryptographic primitives.

My most substantial FOSS work is in py-libp2p, the python implementation of the libp2p networking stack, where I've landed 22+ PRs over the past year as a part of PLDG. Some of my proud PRs are as follows:

- https://github.com/libp2p/py-libp2p/pull/753
- https://github.com/libp2p/py-libp2p/pull/889
- https://github.com/libp2p/py-libp2p/pull/1072
- https://github.com/libp2p/py-libp2p/pull/1199

I've also contributed to Floresta, a lightweight Bitcoin client in Rust, as a Summer of Bitcoin'24 fellow - building functional and stress tests for p2p sync, Electrum bridge, and chain-selection components.

- https://github.com/vinteumorg/Floresta/pull/168
- https://github.com/getfloresta/Floresta/pull/200

Projects:

- rnet: an experimental p2p stack written from scratch in Rust, implementing peer identity, multiaddr, TCP transport, mplex-style multiplexing, DH + ChaCha20Poly1305 secure transport, and Floodsub — primarily to deeply understand libp2p internals. repo: https://github.com/lla-dane/rnet

- P2P-Federated-Learning — decentralized ML training coordination using py-libp2p, Hedera Consensus Service for trustless auditing, and Akave-O3 for dataset/model transfer. Won the Akave/Filecoin track at ETHGlobal New Delhi 2025. repo: https://github.com/lla-dane/P2P-Federated-Learning

Ethereum-adjacent work: Through ETHGlobal hackathons (Singapore '24, ETHOnline '24, ETHIndia '24, New Delhi '25) I've worked with Oasis ROFL (confidential compute), Nillion blind computation, Lit Protocol, CDP AgentKit, and NEAR smart contracts — winning bounty prizes across multiple tracks.

For more context on my previous builds go here, https://shell.soiraspi.win

---

Two projects I'm particularly proud of are rnet and P2P-Federated-Learning — both grew directly out of my work on py-libp2p and pushed me to understand distributed systems at a deeper level.

rnet(github.com/lla-dane/rnet) — a p2p networking stack from scratch in Rust
After spending months contributing to py-libp2p, I wanted to understand the internals — not just use the abstractions but build them. So I wrote an experimental p2p networking stack from scratch in Rust.
The core challenge was getting the layering right: peer identity, multiaddr resolution, TCP transport, stream multiplexing, security, and application-level protocols all need to compose cleanly without leaking concerns across layers. I defined generic traits for each layer, implemented TCP transport with mplex-style multiplexing for concurrent logical streams, built a DH + ChaCha20Poly1305 secure transport layer, and implemented Floodsub end-to-end with peer subscriptions, message propagation, and deduplication.
The most technically demanding part was managing stream lifecycles and protocol execution safely under async Rust — coordinating Arc<Protocols> across the node runtime while avoiding deadlocks and ensuring IO backpressure was handled correctly.
To validate the implementation, I ran RTT benchmarks comparing rnet against rust-libp2p and py-libp2p on the same machine over loopback:
rnet → ~220–300μs
rust-libp2p → ~130–250μs
py-libp2p → ~300–400μs

P2P-Federated-Learning(github.com/lla-dane/P2P-Federated-Learning) — Trustless decentralized ML training | ETHGlobal New Delhi '25
The problem: federated learning setups today almost always rely on a central coordinator — for job distribution, model aggregation, and payment. That coordinator is a single point of failure and trust.
The approach was to replace each of those centralised components with a decentralised equivalent:

py-libp2p for peer discovery, PubSub-based job broadcasting, and coordination — no central server
Akave-O3 presigned URLs for dataset and model transfer, so compute providers never touch credentials directly
Hedera Consensus Service + smart contracts for trustless training state auditing and verifiable incentive payouts to compute providers

The hardest design problem was the incentive flow — how do you pay a compute provider for training without being able to verify their local computation directly? We used Hedera's Consensus Service as an append-only audit log of training states, and structured payouts around verifiable checkpoints rather than final results, so partial contributions were still rewarded.
The project won the Akave/Filecoin track at ETHGlobal New Delhi 2025. Beyond the hackathon, it was the first time I connected everything I'd been learning — py-libp2p internals, blockchain consensus, and decentralised storage — into a single working system with real incentive mechanics.

Both projects share the same underlying motivation: understand distributed systems deeply enough to build them, not just use them.

---

My primary interest is in Ethereum's p2p networking layer — specifically the transport infrastructure, peer discovery, and gossip protocols that underpin how the network propagates information.

Most of my open source work has lived at this layer. Through 22+ contributions to py-libp2p I've worked directly on protocols Ethereum's consensus layer depends on — Gossipsub message propagation, Kademlia DHT peer routing, secure transport (Noise, TLS, PSK-based pnet), and multiaddr transport abstractions. Building rnet from scratch — implementing my own multiplexing, DH-based secure transport, and Floodsub — pushed me to understand why these protocols are designed the way they are, not just how to use them.
That background makes me particularly interested in three areas:
Gossipsub and block propagation — Ethereum's consensus layer uses Gossipsub v1.1 for beacon blocks, attestations, and sync committee messages. The scoring, mesh management, and flood publishing mechanics directly affect propagation latency and resilience to eclipse/sybil attacks. I want to understand how parameter tuning affects propagation under real network conditions, and where the design has room to improve as validator and subnet counts grow.

Discovery and discv5 — Ethereum's shift to topic-based discovery over encrypted UDP is a meaningful design improvement, and I'd like to work closer to it. My contributions around Signed-Peer-Records and Certified-Address-Book in py-libp2p touched adjacent problems around peer authenticity and record integrity — I want to go deeper on eclipse resistance and topic advertisement at scale.
Transport evolution — There's active work around QUIC, WebRTC for browser-reachable nodes, and NAT traversal. I've already contributed WebRTC and Noise multiaddr support and Auto-TLS to py-libp2p. I'm interested in how these improvements affect decentralisation — particularly for light clients that can't rely on persistent TCP connections.
The common thread is the same thing that's driven my open source work: p2p networks fail in emergent, probabilistic ways. That's exactly what makes the networking layer the most interesting place to work on Ethereum.

---

One area I'm particularly excited about is the ongoing work around Gossipsub 1.4 — large message handling in the libp2p specs.
There's active discussion happening right now around formalizing a Gossipsub extension for efficient large payload propagation — covering message segmentation, reassembly and propagation strategy.This is a kind of protocol-layer work I want to go deeper on.
My background makes this a natural fit. I've contributed extensively to py-libp2p's Gossipsub and PubSub internals, worked on the Signed-Peer-Record integration across message propagation paths, and built Floodsub end-to-end from scratch in rnet. I understand the gossip mesh mechanics — scoring, IHAVE/IWANT, mesh management — well enough to contribute meaningfully to both the specification and the implementation side.
Concretely, I'd want to contribute toward:

Specification work — helping formalize the wire format, segmentation model, reassembly lifecycle, and security considerations as a PR to the libp2p/specs repository
libp2p implementation — building out or extending the segmentation and reconstruction layer, with backward-compatible capability negotiation through the v1.3 extension framework
Interoperability testing — cross-validating large message propagation between libp2p implementations under realistic conditions like packet loss, churn, and concurrent publishers
Peer scoring semantics — the interaction between segmented propagation and Gossipsub's P₃ mesh delivery scoring is an open and genuinely interesting design question; I'd like to contribute thinking and testing around it

Beyond Gossipsub 1.4 specifically, I'm broadly interested in any work that touches Ethereum's p2p layer — discv5, transport evolution (QUIC, WebRTC), or network observability.

---

Most of my open source work so far has been at the implementation level — contributing to py-libp2p, building rnet, writing tests for Floresta. EPF would be the first time I get to work inside the Ethereum protocol itself, with direct exposure to how core protocol decisions get made, debated, and shipped.
Specifically, I want to:

Develop a much deeper understanding of how Ethereum's p2p layer actually behaves in production — not just how the protocols are specified, but where the real engineering tradeoffs live
Learn how to contribute to protocol research and specification work, not just implementation — writing RFCs, navigating the spec lifecycle, and building the kind of rigorous thinking that goes into standards-track work
Work alongside and learn from people who have been building Ethereum's core infrastructure for years — that kind of mentorship and context is something I can't get from open source contributions alone

What I'd contribute:
I'm not coming in as a blank slate. I have hands-on familiarity with the exact protocols Ethereum's networking layer is built on — Gossipsub, Kademlia DHT, secure transport, multiaddr — from 22+ PRs to py-libp2p and building a p2p stack from scratch in Rust. That means I can get productive quickly without needing the networking fundamentals explained from the ground up.
Beyond technical skills, I'd bring a habit of going deep rather than wide. Whether it was aligning py-libp2p's PeerStore with go-libp2p specs, understanding why the Gossipsub scoring model is designed the way it is, or benchmarking rnet against rust-libp2p to find where the overhead actually lives — I tend to chase the underlying mechanics rather than stop at the surface. I think that disposition is genuinely useful in a research-oriented cohort.
I'd also contribute actively to the cohort community — writing up what I learn, engaging seriously with other fellows' work, and treating this as a collaborative environment rather than an individual project.

---

Yes — I use AI regularly as a development tool, mostly to accelerate iteration and exploration. I use tools like ChatGPT, Claude, and Cursor for debugging, code review, understanding unfamiliar codebases, generating boilerplate, and exploring design tradeoffs. I also use AI while reading protocols/specs or working through systems-level concepts to speed up research and experimentation. In practice, it helps me move faster on implementation details while keeping more focus on architecture, protocol behavior, and actual problem solving rather than repetitive work.
