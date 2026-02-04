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
- Hostname: mapping [human-readable-strings <-> IP]

- APPLICATION LAYER: 
	- responsible for providing network services to the user-applications.
	- uses the application-layer-protocols: HTTP  HTTPS  FTP  SMTP
	- before sending to the next-layer(Transport), the raw user-application data is encapsulated by the appl-lyr-proto, which adds appl-layer header to raw-data. 
	- Each subsequent layer adds its own header.


