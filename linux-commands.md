### awk

```bash
awk -F ":" '{print $1"\t"$6"\t"$7} /etc/passwd'
awk 'BEGIN{FS=":"; OFS="-"} {print $1,$6,$7} /etc/passwd'
```

### arp-scan

```bash
sudo arp-scan --localnet

# Scan the whole network
nmap -sn 192.168.31.0/24
```
### ssh

```bash
ssh -p 8834 ssh@192.168.31.?
ssh shelby@192.168.31.?

# Configs
sudo cat /etc/ssh/sshd_config | grep Port   # 22
cat $PREFIX/etc/ssh/sshd_config | grep Port  # 8022

```

### port-scan

```bash
ss  -tuln
```
