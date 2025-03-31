#1/bin/bash 

echo "======== SYSTEM STATS ========="

# Get OS version 
neofetch | awk -F ":" '/Kernel/ {print "OS Version:", $2}'

# Uptime
uptime -p | awk '{print "Uptime:", $0}'

# Load Average
uptime | awk -F "load average:" '{print "Load Average:", $2}'

# Number of logged in users 
who | wc -l | awk '{print "Logged-in Users:", $1}'

# CPU Usage
top -bn1 | grep "Cpu(s)" | awk '{print "CPU Usage:", 100 - $8 "%"}'

# Memory Usage
free -h | awk '/^Mem:/ {print "Used:", $3 "/", $2 " (", $3*100/$2 "%)"}'

# Disk Usage
df -h --total | grep 'total' | awk '{print "Used:", $3 "/", $2 " ("$5 " used)"}' 

