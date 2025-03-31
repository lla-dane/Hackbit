### awk

```bash
awk -F ":" '{print $1"\t"$6"\t"$7} /etc/passwd'
awk 'BEGIN{FS=":"; OFS="-"} {print $1,$6,$7} /etc/passwd'
```

### arp-scan

```bash
sudo arp-scan --localnet
ssh -p 8834 ssh@<IP>
```
