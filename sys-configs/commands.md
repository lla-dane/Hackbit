- Disable animations: `gsettings set org.gnome.desktop.interface enable-animations false`
- Monitor brightness: `xrandr --output HDMI-1-0 --brightness 0.6`
- LLM request: 
    ```bash
    curl -X POST https://curated.aleph.cloud/vm/84df52ac4466d121ef3bb409bb14f315de7be4ce600e8948d71df6485aa5bcc3/completion \
        -H "Content-Type: application/json" \
        -d '{
            "prompt": "Hello, how are you?",
            "n_predict": 200
            }'
    ```
- Domain name -> IP: `nslookup <domain-name>`
- IP -> geolocation: `whois <IP4/6-ADDR>`
- Local_IP: `curl ifconfig.me`
- Caching utilities for software: `ps aux | grep brave`
- Kill all caching utitties: `pkill brave`