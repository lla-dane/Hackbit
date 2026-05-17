Contributed to core p2p infrastructure in the py-libp2p (https://github.com/libp2p/py-libp2p) peer-to-peer networking stack as a part of protocol labs dev guild contributor

- 22 pull requests to py-libp2p and py-multiaddr. 
- Alligned PeerStore and record handling with go-libp2p specifications, improving protocol correctness and interoperability.
- Introduced peer autenticity mechanisms, including Certified-Address-Book and signed-peer-records, integrated across PubSub and Kademlia DHT message propagation.
- Expanded multiaddr protocol support in WebRTC, Noise, garlic, ipcidr, http-path, improving compatibility with mordern libp2p transports.
- Extended security and transport layers with Auto-TLS support, and PSK-based private networking (pnet).
- Introduce Prometheus metrics to the core services, improving network oberservability.

Contributed to the testing infrastructure of Floresta (https://github.com/getfloresta/Floresta), a lightweight and embeddable Bitcoin client, as a part of Summer of Bitcoin 2024 Fellow.

- Built tests for floresta-wire and sync-node including functional and stress tests for p2p and Electrum services.
- Improved node reliability adn sync correcteness by fixing issues in chain-selection and peer-management.
- Validated end-to-end behavior across chain, watch-only wallets, and Electrum bridge components.
