Hi Atheon team, I'm Abhinav.
I'm a 4th year student at IIT-Varnasi with dual degree major in Mathematics and Computing. I've been exploring and building on async/tokio Rust and p2p-networking internals for past 2 years.

Next I will summarize a few cool stuff I have built across the years. Will drop my socials first, incase the builds are too elaborate to read:

- Portfolio: https://shell.soiraspi.win (\***\*\*\*\*\***)
- Github: https://github.com/lla-dane
- Twitter: https://x.com/lla_dane
- Linkedin: https://www.linkedin.com/in/abhinav-agarwalla-a80425258/

Most recent of my rust work is building a peer-to-peer networking stack in reference with the official libp2p specifications. repo: https://github.com/lla-dane/rnet

I've been a core contributor in libp2p(-py) (https://github.com/libp2p/py-libp2p) implementation from the past year as a part of Protocol Labs Dev Guild contributor. So in libp2p I have contributed around:

- transport layers and stream multiplexers,
- improving message authenticity in p2p broadcasting services (Gossipsub & Kad-DHT),
- expanded TLS security pipleine to introduce CA authorised TLS certificates by implementing the autotls-client spec from official libp2p specs so that py-libp2p nodes can operate over web-rtc without any security-credibility issue,
- introduced Prometheus/Grafana dashboards for better network observability,
- alligning the peerstore implementation in py-libp2p with go-libp2p as per latest specs.

So been contributing in different p2p concepts, I eventually developed an itch to go more deeper, but Rust was my language of choice, so I began writing a p2p stack in scratch with all my knowledge about p2p-infra that I gained while contributing to py-libp2p, implementing:

- TCP/UDP transport layers, connection management, peerstore,
- mplex style stream multiplexers for multiple logical streams, deffi-Hellman + ChaCha20Poly1305 shared secret exchange for secure-encrypted streams,
- p2p broadcasting service on the floodsub specification, and ping service,
  So as it is understood, Rust and python are very different languages, and writing code in Rust with designs of Python infra, can be very troubling. So along the way, I had to pivot from the py-libp2p design plans and articulate my own. So this was the point for that extra-mile of rust async/tokio concepts I began to touch. I even document some of the important findings in rust and my design choices here: https://github.com/lla-dane/rnet/blob/master/logs/findings.md

Related to this, I am also working on my master thesis, for improving latency in a distributed network using Random-Linear-Network-Coding techniques in broadcasting services, which increases bandwidth but reduces latency significantly. I have a few things going on for this,

- Concept-Document: https://docs.google.com/document/d/1Wo0ipCh63JketyoeDGfz7qiyer6m3BOg9ng9cIWP8eI/edit?tab=t.0
- Prototype code/pipeline for RLNC mathematical operations:
  - https://github.com/lla-dane/rnet/blob/rlnc-plans/examples/rlnc/README.md
  - https://github.com/lla-dane/rnet/blob/rlnc-plans/examples/rlnc/src/main.rs

Apart from this recent 1year of deep protocol work, I have built/won at a number of Hackthons like ETHSingapore'24, ETHOnline'24, ETHIndia'24, ETHNewDelhi'26 etc. The details of the hackathon projects are available in detail at my portfolio website in the builds section: https://shell.soiraspi.win/builds/

At the most recent hackathon at EthNewDelhi'26, we built a p2p federated learning platform, a classic example of decentralized computing which is training ML models over a distributed p2p network. We won the Filecoin/Akave track for this project at the IRL hackathon. For this we built a p2p network (using py-libp2) and distributed the dataset chunks among a set of trainer nodes, and they trained over the dataset and uploaded the computed weights to decentralized storage layer built with Akave, and then the CID hashes were sent to the client who wanted the training to be done, and they can fetch the weights and feed it to their model and see the accuracy increase. Here's the repo: https://github.com/lla-dane/P2P-Federated-Learning. I had the role to bootstrap the whole p2p layer in this, and main challenge was to design the data flow patterns required for our particular PS. So that was fun.

I once wrote an end-to-end Bitcoin transaction validator and block mining pipelining from scratch on Rust, without using any bitcoin related libraries for transaction validation and block mining. It included:

- end-to-end tx validation and merke tree construction,
- PoW block header mining,
- the biggest challenge was implementign signature verification for different kinds of bitcoin trasactions like P2PKH, P2SH, P2WPKH, P2WSH. For this I had read tranpaction specs on official BIPs and code the verification pipeline reading from the specs. This was pretty fun.
- Prioritizing transaction by fee/weight ratio, and produced a final block of ~4M weight, ~21.6M sats in fees, 4,400 transactions, meeting target difficulty and Bitcoin serialization rules.
  This was me reading the Bitcoin spec and turning it into working code. repo: https://github.com/lla-dane/Tx-Validator

Before this I contributed to Bitcoin lightweight and embeddable client written in Rust, Floresta(https://github.com/getfloresta/Floresta), as a Summer of Bitcoin'24 fellow. I Contributed in the testing infrastructure of the codebase,

- building functional tests for floresta-wire and sync node and stress tests for p2p and Electrum services,
- fixed some core vulnerabilites in the chain-selection and peer-management components,
- validated end-to-end behavior across chain, watch-only wallets, and Electrum bridge components.

So this is me in opensource. I do a lot of random stuff too, like:

- I have a tech blog here: https://soishell.hashnode.dev/, check it out.
  Arch linux is my daily driver, as it comes it lot of system-breaks for its rolling release, I maintain logs on customizing my system in case of re-installs of the OS, https://github.com/lla-dane/Hackbit/blob/master/sys-config/logs/archsetup.md.
- mainitaing a log for cool and uselful linux commands, https://github.com/lla-dane/Hackbit/blob/master/README.md

On why Atheon specifically — ZK has been an area I've been circling for a while. I once spent time designing a Dark Pool solution using FHE and ZK-proofs. It didn't ship, but it was the first time I hit the real boundary between knowing a primitive exists and actually being able to implement it from a spec — and that gap is exactly what I want to close. My current thesis work on Random-Linear-Network-Coding for latency reduction in broadcast networks sits close to this too — optimizing how information propagates across constrained distributed systems is not far from the problems ZK infrastructure has to solve at scale. Beyond that, translating specs into production code and owning subsystems end-to-end is something I've been doing in libp2p and rnet for two years now — that part I'm already comfortable with.

So I would end the mail here, and believe that I can be of good use to the team, and would love to hear back if there's a fit. Thank you for reading along.
Abhinav

- Portfolio: https://shell.soiraspi.win (\***\*\*\*\*\***)
- Github: https://github.com/lla-dane
- Twitter: https://x.com/lla_dane
- Linkedin: https://www.linkedin.com/in/abhinav-agarwalla-a80425258/
