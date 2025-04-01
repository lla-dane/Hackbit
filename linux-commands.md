### awk

```bash
awk -F ":" '{print $1"\t"$6"\t"$7} /etc/passwd'
awk 'BEGIN{FS=":"; OFS="-"} {print $1,$6,$7} /etc/passwd'
```

### arp-scan

```bash
sudo arp-scan --localnet
ssh -p 8834 ssh@192.168.31.?

# Android (scans the whole network)
nmap -sn 192.168.31.0/24
ssh shelby@192.168.31.?
```
