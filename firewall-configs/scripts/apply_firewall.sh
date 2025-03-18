#!/bin/bash

LOG_FILE="/var/log/firewall-update.log"
GIT_PATH="/usr/bin/git"
UFW_PATH="/usr/sbin/ufw"
FIREWALL_CONFIG_DIR="/firewall-configs/roles"

echo "🚀 Updating firewall rules - $(date)" | tee -a $LOG_FILE

# Step 1: Pull the latest firewall rules from GitHub
cd /firewall-configs || exit 1
$GIT_PATH pull origin main >> $LOG_FILE 2>&1

# Step 2: Detect server role
if [ ! -f /etc/server-role ]; then
    echo "❌ Server role file not found! Exiting." | tee -a $LOG_FILE
    exit 1
fi

ROLE=$(cat /etc/server-role)
echo "🔍 Server role detected: $ROLE" | tee -a $LOG_FILE

# Step 3: Apply the correct firewall rules
RULE_FILE="$FIREWALL_CONFIG_DIR/$ROLE.rules"

if [ -f "$RULE_FILE" ]; then
    echo "⚙️ Applying firewall rules from $RULE_FILE" | tee -a $LOG_FILE
    bash "$RULE_FILE" >> $LOG_FILE 2>&1
    echo "✅ Firewall rules applied successfully!" | tee -a $LOG_FILE
else
    echo "❌ No firewall rules found for role '$ROLE'. Skipping." | tee -a $LOG_FILE
    exit 1
fi
