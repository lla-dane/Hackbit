# Automated Firewall Configuration Management

An example simulation for Automated Firewall Configuration Management

Firewall-rules for 3 server roles: web-server, databaseserver, bastion are written in `roles` dir. We will simulate 3 docker containers linked with each other through a LAN`firewall-net` simulated with DOCKER. An we will use `cron` for imposing the automated firewall-configurations on the servers as per thier role types from this central repository. 


## Setup

* Simulate a Docker network for the server containers to interact with each other in the LAN

```bash
docker network create --subnet=192.168.1.0/24 firewall-net
```

* Start the container for servers:

```bash
docker run -dit --name webserver --net firewall-net --privileged --ip 192.168.1.10 ubuntu bash 
docker run -dit --name databaseserver --net firewall-net --privileged --ip 192.168.1.20 ubuntu bash 
docker run -dit --name bastion --net firewall-net --privileged --ip 192.168.1.30 ubuntu bash 
```

#### By using the `--privileged` tag here, upon entering the containers, user will land with root privileges of the host system, which could be dangerous, so configure carefully. 

* Configure each container

```bash
docker exec -it webserver bash # Attach to a container
apt update && apt install ufw git cron nano -y # Install the required tools
```
Here `ufw` is used instead of `iptables` as they are a little bit easier to use, and `cron` for scheduled command execution. Repeat this for each container (databaseserver, bastion).

* Clone the central repo and set server-roles
```bash
git clone https://github.com/lla-dane/Rust.git
echo "webserver" > /etc/server-role # Change for each container
```
* Scheduling Automatic firewall updates using `cron`

```bash
export EDITOR=nano # Set the editor as nano for cron editor
crontab -e # Open up the cron editor
```
Add the below line to impose latest firewall configs from the central repo every minute

```bash
*/1 * * * * /bin/bash Rust/firewall-configs/scripts/apply_firewall.sh >> /var/log/firewall-update.log 2>&1
```

* The setup is now complete and we start and monitor the cronjob

```bash
service start cron
```

See the logs and updated firewall configs every minute
```bash
cat /var/log/firewall-update.log # View the latest logs
truncate -s 0 /var/log/firewall-update.log # Log clean up
```
### For Arch Linux



## Testing

* View the automatically applied firewall configs using `ufw` 

```bash
ufw status verbose

# Output for web server:
# Status: active
# Logging: on (low)
# Default: deny (incoming), allow (outgoing), deny (routed)
# New profiles: skip

# To                         Action      From
# --                         ------      ----
# 22/tcp                     ALLOW IN    Anywhere                  
# 80/tcp                     ALLOW IN    Anywhere                  
# 443/tcp                    ALLOW IN    Anywhere                  
# 22/tcp (v6)                ALLOW IN    Anywhere (v6)             
# 80/tcp (v6)                ALLOW IN    Anywhere (v6)             
# 443/tcp (v6)               ALLOW IN    Anywhere (v6)             
```

* Denied incoming requests to ssh, http and mySql from the LAN networks

```bash
docker exec -it webserver ssh 192.168.1.20
docker exec -it databaseserver curl -v 192.168.1.10:80
docker exec -it webserver nc -zv 192.168.1.20 3306
```
These will fail unless explicitely allowed like this: 

```bash
docker exec -it databaseserver ufw allow from 192.168.1.10 to any port 22
docker exec -it databaseserver ufw reload
# Now SSH from webserver -> databaseserver will work
```

```bash
# Start docker service
sudo systemctl start docker

# Check the containers running
sudo docker ps

# Disable docker daemon and socket
sudo systemctl stop docker
sudo systemctl stop docker.socket
```

