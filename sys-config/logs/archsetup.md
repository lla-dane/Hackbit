## Nvim:
```zsh
sudo pacman -S nvim

# Clipboard
sudo pacman -S xclip
checkhealth provider #(inside nvim)

# init.lua file soft-link
rm -rf ~/.config/nvim/init.lua
ln -s ~/Desktop/Hackbit/sys-config/i3/nvim-init.lua ~/.config/nvim/init.lua

```




--------------------------------------------------------
## Docker:
```zsh
sudo pacman -S docker
sudo usermod -aG docker soi
sudo systemctl enable docker.socket
reboot

# Run a simple container
docker run -it --rm archlinux bash -c "echo hello world"

# Separate the docker storage filesystem
sudo cp -r /var/lib/docker ~/Documents
sudo rm -rf /var/lib/docker
sudo ln -s ~/Documents/docker /var/lib/docker
ls -la /var/lib/docker
docker run -it --rm archlinux bash -c "echo hello world"

# Docker-compose
sudo pacman -S docker-compose

# Install TUI for docker
sudo pacman -S lazydocker
```
# Remove docker and images:
https://wiki.archlinux.org/title/Docker#Remove_Docker_and_images


--------------------------------------------------------
## zsh:
```zsh
sudo pacman -S zsh zsh-autosuggestions zsh-syntax-highlighting
```

--------------------------------------------------------
## Screen-timeout customize
```zsh
sudo pacman -S xorg-xset
xset q
xset s off -dpms s noblank
```

-------------------------------------------------------
## Do nothing with the lid off
```zsh
sudo nano /etc/systemd/logind.conf
HandleLidSwitch=ignore
```

-------------------------------------------------------
## Wireshark-cli 
```zsh
sudo pacman -S wireshark-cli
sudo tshark -i "lo" -f "udp" 
```

-------------------------------------------------------
## Docker:
https://medium.com/@furkan.turkal/how-does-docker-actually-work-the-hard-way-a-technical-deep-diving-c5b8ea2f0422


-------------------------------------------------------
## Wallpaper utility:
```zsh
sudo pacman -S feh
feh --randomize --bg-fill ~/Documents/wallpapers/prime
```

-------------------------------------------------------
## Soft links to all the config files
```zsh
rm -rf /etc/i3blocks.conf
sudo ln -s ~/Desktop/Hackbit/sys-config/i3/i3blocks.conf /etc/i3blocks.conf

rm -rf ~/.config/i3/config
sudo ln -s ~/Desktop/Hackbit/sys-config/i3/i3config ~/.config/i3/config

rm -rf ~/.zshrc
sudo ln -s ~/Desktop/Hackbit/sys-config/i3/.zshrc ~/.zshrc

rm -rf /var/log/pacman.log
ln -s ~/Desktop/Hackbit/sys-config/logs/pacman/pacman.log  /var/log/pacman.log
```

-------------------------------------------------------
## Proton VPN GUI (Do the hack and connect with VPN)
```zsh
sudo pacman -S proton-vpn-gtk-app
```

-------------------------------------------------------
## Background for gdm lock screen: gse-gdm-extenstion
https://github.com/pratap-panabaka/gse-gdm-extension


-------------------------------------------------------
## TLP 
https://linrunner.de/tlp/installation/arch.html
https://wiki.archlinux.org/title/TLP


-------------------------------------------------------
## Virtual Manager QEMU: 
https://tanis.codes/posts/virt-manager-qemu-arch-linux/


-------------------------------------------------------
## Systemd-service for battery threshold(FAILED in threshold)
```
sudo nano /etc/systemd/system/battery-threshold.service 
```

```zsh
[Unit]
Description=Force battery charge limit after ASUS WMI init
After=asusd.service
Wants=asusd.service

[Service]
Type=oneshot
ExecStart=/bin/sh -c 'sleep 5; echo 80 > /sys/class/power_supply/BAT1/charge_control_end_threshold'

[Install]
WantedBy=multi-user.target
```

```zsh
sudo systemctl enable start battery-threshold.service
cat /sys/class/power_supply/BAT1/charge_control_end_threshold
```

-------------------------------------------------------
## Hotspot (Failed)
```zsh
sudo pacman -S ethtool 
sudo ethtool enp55s0f3u1u4 | grep Speed
yay -S create_ap

# REgulatory domain 
sudo pacman -Syu wireless-regdb
sudo nano /etc/conf.d/wireless-regdom
reboot
iw reg get

# Re-install the DKMS version which often has better AP support (DID NOT WORK)
yay -S rtw89-dkms-git
sudo nano /etc/modprobe.d/rtw89.conf

# Add these
options rtw89_pci disable_aspm_l1=y disable_aspm_l1ss=y
options rtw89_core disable_ps_mode=y
```

-------------------------------------------------------
## Nvidia drivers setup:
```zsh
sudo pacman -S linux-headers
sudo pacman -S nvidia-utils nvidia-settings
sudo pacman -S nvidia-dkms
reboot 

# Then open the bios, and short circuit the Discrete GPU with mux switch.
# Then reboot and see of its is only runnin on discrete
# Then shift to dynamic
```

-------------------------------------------------------
## JetBrains mono font: 
```zsh
sudo pacman -S ttf-jetbrains-mono
fc-list | grep JetBrains

# Set jetbrains as kitty fonts
kitty +list-fonts 
```

-------------------------------------------------------
## Rust installation 
```zsh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
reload && rustup update
```

-------------------------------------------------------
## Install python3.12: (libp2p bugs with python 3.14)
```zsh
uv python install 3.12
uv python list 
```

-------------------------------------------------------
## Cross-platform package manager: snap 
```zsh
git clone https://aur.archlinux.org/snapd.git
cd snapd
makepkg -si
sudo systemctl enable --now snapd.socket
sudo systemctl enable --now snapd.apparmor.service
sudo ln -s /var/lib/snapd/snap /snap
sudo snap install snap-store (optional)
export PATH=$PATH:/snap/bin (optional, already done in zshrc)
```

```zsh
# Amazing
soi@soiarch ~ ❯ sudo snap install astral-uv --classic
error: cannot install "astral-uv": classic confinement requires snaps under /snap or symlink from
       /snap to /var/lib/snapd/snap
soi@soiarch ~ ❯ sudo ln -s /var/lib/snapd/snap /snap
```

-------------------------------------------------------
## Volume control
```zsh
# See the audio server
pactl info 
sudo pacman -S pamixer
pamixer --get-volume
```

-------------------------------------------------------
## i3 ghost output isuue:
```zsh
i3-msg -t get_workspaces
i3-msg restart (wont do any good)

# Turn off a particular display output
xrandr --output DP-2 --off
```

-------------------------------------------------------
## Spotify: 
```zsh
yay -S spotify-launcher
```

-------------------------------------------------------
## Brightness and Audio-Output sink: 
```zsh
sudo pacman -S brightnessctl playerctl
```

-------------------------------------------------------
## locate and man command:
```zsh
sudo pacman -S plocate man-db man-pages
sudo updatedb
```

-------------------------------------------------------
## Touchpad clicks not working
```zsh
sudo pacman -S xorg-xinput
echo $DISPLAY
xinput list 
xinput list-props "ASUP1205:00 093A:2008 Touchpad" | grep -i click

# This fixed for runtime only 
xinput set-prop "ASUP1205:00 093A:2008 Touchpad" "libinput Tapping Enabled" 1 

# Permanent
sudo nano /etc/X11/xorg.conf.d/40-touchpad.conf

Section "InputClass"
    Identifier "ASUS Touchpad"
    MatchIsTouchpad "on"
    Driver "libinput"

    Option "Tapping" "on"
    Option "NaturalScrolling" "false"
EndSection
```

-------------------------------------------------------
## Fix the i3 config file: Just paste the config, the terminal width and all everythign will be solved.


-------------------------------------------------------
## Reverse the mouse scrolling direction(did not work): 
```zsh
gsettings set org.gnome.desktop.peripherals.touchpad natural-scroll false
gsettings get org.gnome.desktop.peripherals.touchpad natural-scroll
```

-------------------------------------------------------
## screenshot util: flameshot
```zsh
sudo pacman --sync flameshot
```

-------------------------------------------------------
## microsoft edge scaling issue: adress bar too big
```zsh
microsoft-edge-setup --force-device-scale-factor=0.9
```

