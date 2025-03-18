#!bin/bash

LOG_FILE="/var/log/firewall-update.log"

echo "Updating firewall rules - $(date)" | tee -a $LOG_FILE

# Pull the latest firewall rules from Github
cd /firewall-configs
git pull origin main >> $LOG_FILE 2>&1

# Check server role
ROLE=$(cat /etc/server-role)
echo "Server role detected: $ROLE" | tee -a $LOG_FILE

# Apply corresponsig firewalls
if ["$ROLE" == "webserver"]; then
    sudo bash roles/webserver.rules
elif [ "$ROLE" == "database" ]; then
    sudo bash roles/database.rules
elif [ "$ROLE" == "bastion" ]; then
    sudo bash roles/bastion.rules
else
    echo "❌ Unknown role. No firewall changes applied." | tee -a $LOG_FILE
    exit 1
fi

echo "Firewall rules updated successfully!" | tee -a $LOG_FILE