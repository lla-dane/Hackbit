- Disable animations: `gsettings set org.gnome.desktop.interface enable-animations false`
- Monitor brightness: `xrandr --output HDMI-1-0 --brightness 0.6`
- Monitor config: `xrandr --output HDMI-1-0 --mode 2560x1440 --left-of eDP-2 --auto`
- LLM request: 
    ```bash
    curl -X POST https://curated.aleph.cloud/vm/84df52ac4466d121ef3bb409bb14f315de7be4ce600e8948d71df6485aa5bcc3/completion \
        -H "Content-Type: application/json" \
        -d '{
            "prompt": "Hello, how are you?",
            "n_predict": 200
            }'
    ```
- ssh: `ssh -p <port> ssh@<local-ip>`
- Domain name -> IP: `nslookup <domain-name>`
- IP -> geolocation: `whois <IP4/6-ADDR>`
- Local_IP: `curl ifconfig.me`
- arp-scan: `sudo arp-scan --localnet`
- Ping/Scan the local subnet: `nmap -sn 192.168.31.0/24`
- Port scan: `watch ss -tuln`
- Running processes: `ps aux | grep brave`
- Kill all caching utitties: `pkill brave`
- i3blocks config: `~/.config/i3blocks/config`
- i3 config: `~/.config/i3/config`
- awk :
    ```bash
    awk -F ":" '{print $1"\t"$6"\t"$7} /etc/passwd'
    awk 'BEGIN{FS=":"; OFS="-"} {print $1,$6,$7} /etc/passwd'
    ```