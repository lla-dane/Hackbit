- ROUTES ?? 






- DNS: There are servers that stores the mappnig of domain <-> ip, and DNS query happens when we try to connect via domain names.
 
- Seven layers of OSI:
	- Physical
	- Data Link
	- Network
	- Transport
	- Session 
	- Presentation 
	- Application

- Four layers of TCP/IP model:
	- Application layer: determines how web-services etc. interface with trabsport layer to exchange data.
	- Transport layer: responsible for end-to-end communication + data-integrity. TCP/UDP
	- Network layer: specifies how to move packets b/w hosts and across different networks. Main job is addressing and routing. IP/ICMP
	- Link layer: specifies how to send data across a physical peice of hardware, like Ethernet, Wi-Fi etc.

- MAC addr: unique identifier assigned to NIC. 
- IP addr: dynamically-assigned logical-identifier for a device on a network.
- Hostname: mapping `human-readable-strings <-> IP`

- APPLICATION LAYER: 
	- responsible for providing network services to the user-applications.
	- uses the application-layer-protocols: HTTP  HTTPS  FTP  SMTP
	- before sending to the next-layer(Transport), the raw user-application data is encapsulated by the appl-lyr-proto, which adds appl-layer header to raw-data. 
	- Each subsequent layer adds its own header.

- TRANSPORT LAYER:
    - responsible for end-to-end communicatin between different hosts.
    - segmentation: breaks down large payload to smaller packets.
    - transport-layer attaches source and destination ports on each segment.
    - 2 main transport protocols: 
        - UDP: fast & unreliable
        - TCP: reliable & slow, re-transmission upon packet drops.
            - SYN: intitiate connectoion `client -> server`
            - SYN-ACK: acknowledge client's req `server -> client`
            - ACK: confirm estblished connection `client -> server`
            - once handshake established, data exchanged reliably.
            - uses sequence numbers to track each segment, for dest to reassemble the paylaod

- NETWORK LAYER:
    - logical addressing and routing of data-packets.
    - determine optimal path for data to travel, `packet routing`
    - smaller networks that consitute the internet -> subnet. All subnets are connected.
    - here data is received from the transport layer, and encapsulated to a new unit: IP packet.
    - a header is added to the packet, including source-ip and destination-ip.

- LINK LAYER:
    - hardware-specific, derictly dealing with NIC
    - packet from the network layer, encapsulated into `frame`, and the `link layer` is added.
    - `link-layer` header contains the `source & dest MAC addrs` of the hosts.
    - `ARP`, a link-layer protocol used to find MAC addr for IP in same network.
    
- DYNAMIC HOST CONFIGURATION PROTOCOL (DHCP):
    - used to automatically assign IP and other network configs to a device on a network.
    - DHCP server, is responsible to manage a pool of IP addrs and lease them to client devices.
    - in a home network, the router acts as the DHCP server, in larger networks there are dedicated DHCP servers.
    - process of device obtaining an IP addr via DHCP, i.e DORA:
        - DISCOVER: `host -> [DISCOVER] -> network`, to find available DHCP server.
        - OFFER: `dhcp -> [OFFER] -> host`, msg contains:
            - proposed IP addr
            - subent mask
            - gateway addr
            - lease duration
        - REQUEST: host chooses from received `OFFER`s, `client -> [REQUEST] -> dhcp-servers`, to inform which offer it has accepted.
        - ACKNOWLEDGMENT: `dhcp-server -> [ACK] -> host`, confirming the lease and finalizing the config.
