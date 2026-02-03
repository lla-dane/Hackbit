# Enable history
HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000

export PATH="$HOME/.local/protoc-25.3/bin:$PATH"
export PATH=$PATH:/snap/bin
export PATH=/home/shelby/.nimble/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH

# Enable word jumping with Alt + arrow keys
autoload -U select-word-style
select-word-style bash 

# Bind escape sequencces for common terminals
bindkey "\e[1;3C" forward-word   # Alt + Right
bindkey "\e[1;3D" backward-word  # Alt + Left

# Optional: make Ctrl + Left/Right work too (if you want it)
bindkey "^[[1;5C" forward-word     # Ctrl + Right
bindkey "^[[1;5D" backward-word    # Ctrl + Left

# Set prompt
autoload -Uz promptinit && promptinit
PROMPT='%F{cyan}%n@%m %F{226}%~ %F{226}❯ %f'

# Enable auto-completion
autoload -Uz compinit && compinit

# Enable syntax highlighting (if installed)
if [[ -f /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh ]]; then
    source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
fi

# Enable autosuggestions (if installed)
if [[ -f /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh ]]; then
    source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
fi

# Change syntax highlighting colors
typeset -A ZSH_HIGHLIGHT_STYLES

# Valid commands: Bright green
ZSH_HIGHLIGHT_STYLES[command]='fg=46,bold'

# Options/flags (`-l`, `--help`): Bright cyan
ZSH_HIGHLIGHT_STYLES[arg0]='fg=51'

# Quoted text: Bright yellow
ZSH_HIGHLIGHT_STYLES[single-quoted-argument]='fg=226'
ZSH_HIGHLIGHT_STYLES[double-quoted-argument]='fg=226'

# Paths (`/home/user`): green
ZSH_HIGHLIGHT_STYLES[path]='fg=82'

# Errors: **Red (for errors only)**
ZSH_HIGHLIGHT_STYLES[error]='fg=196,bold'

# Autosuggestions: Dim cyan
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=51'

# Source nvm only when needed
export NVM_DIR="$HOME/.nvm"
# source /usr/share/nvm/init-nvm.sh

load_nvm() {
    if [ -z "$NVM_LOADED" ]; then
        export NVM_LOADED=1
        [ -s "/usr/share/nvm/init-nvm.sh" ] && \. "/usr/share/nvm/init-nvm.sh"
    fi
}

# Create lightweight functions that load NVM only when necessary
nvm() { load_nvm; command nvm "$@"; }
node() { load_nvm; command node "$@"; }
npm() { load_nvm; command npm "$@"; }
npx() { load_nvm; command npx "$@"; }
yarn() { load_nvm; command yarn "$@"; }

# Manually initialize conda only when needed
conda() {
    unset -f conda
    if [ -f "/home/shelby/miniconda3/etc/profile.d/conda.sh" ]; then
        . "/home/shelby/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/shelby/miniconda3/bin:$PATH"
    fi
    conda "$@"
}
# <<< conda initialize <<<


# Created by `pipx` on 2025-03-22 14:56:10
export PATH="$PATH:/home/shelby/.local/bin"

# Docker socket config
export DOCKER_HOST=unix:///var/run/docker.sock

# Source cargo when needed
[ -f "$HOME/.cargo/env" ] && . "$HOME/.cargo/env"

export PATH="$HOME/.local/share/gem/ruby/3.3.0/bin:$PATH"

export PATH="${HOME}/.local/bin:$PATH"

export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"

# BEGIN SCARB COMPLETIONS
_scarb() {
  if ! scarb completions zsh >/dev/null 2>&1; then
    return 0
  fi
  eval "$(scarb completions zsh)"
  _scarb "$@"
}
autoload -Uz compinit && compinit
compdef _scarb scarb
# END SCARB COMPLETIONS

## ------ALIASES------

# --POWER-PROFILES--
alias power-high="asusctl profile -P Performance"
alias power-mid="asusctl profile -P Balanced"
alias power-low="asusctl profile -P Quiet"
alias power="asusctl profile -p"

# --GPU-PROFILES--
alias gpu-integrated="supergfxctl -m Integrated"
alias gpu-dedicated="supergfxctl -m AsusMuxDgpu"
alias gpu-get="supergfxctl -g"

# --GENERAL--
alias starkup="curl --proto '=https' --tlsv1.2 -sSf https://sh.starkup.sh | sh -s --"
alias open='xdg-open'
alias terminal='gnome-terminal'
alias light='xrandr --output HDMI-1-0 --brightness'
alias screen='xrandr --output DP-2 --mode 2560x1440 --left-of eDP-1 --auto'
alias wallpaper="~/Desktop/Hackbit/sys-config/i3/scripts/i3_wallpaper.sh & disown"
alias st-hanabi='gnome-extensions enable hanabi-extension@jeffshee.github.io'
alias sp-hanabi='gnome-extensions disable hanabi-extension@jeffshee.github.io'
alias bluetooth='sudo systemctl start bluetooth'
alias hotspot="sudo rfkill unblock wifi && sudo create_ap wlan0 enp55s0f3u1u4 soiarch abhi2004 --freq-band 5 -c 36"
alias .1="cd .."
alias .2="cd ../.."
alias .3="cd ../../.."
alias venv=". .venv/bin/activate"
alias cmds="cat ~/Desktop/Hackbit/README.md"
alias ncmds="nano ~/Desktop/Hackbit/README.md"

# --LOGS--
alias sys='nvim ~/Desktop/Hackbit/sys-config'
alias logs='nvim ~/Desktop/Hackbit/sys-config/logs'
alias i3c='nvim ~/Desktop/Hackbit/sys-config/i3'
alias docs='nvim ~/Desktop/Hackbit/sys-config/docs'
alias sys-code='code ~/Desktop/Hackbit/sys-config'
alias hackbit='nano ~/Desktop/Hackbit/README.md'

# --SYS-CONFIG--
alias config='code ~/Desktop/Hackbit/sys-config/i3'
alias zshrc='nano ~/Desktop/Hackbit/sys-config/i3/.zshrc'
alias zshrc-code='code ~/Desktop/Hackbit/sys-config/i3/.zshrc'
alias load='source ~/Desktop/Hackbit/sys-config/i3/.zshrc'
alias reload='source ~/.zshrc'


# --DOCKER--
alias docker-start='sudo systemctl start docker'
alias docker-stop='sudo systemctl stop docker docker.socket'
alias docker-status='sudo systemctl status docker'

# --SSH-CONNECTIONS--
alias bootstrap="ssh -i "Desktop/libp2p/P2P-Federated-Learning/aws-keys/p2p-1.pem" ubuntu@ec2-35-154-61-220.ap-south-1.compute.amazonaws.com"
alias client="ssh -i "Desktop/libp2p/P2P-Federated-Learning/aws-keys/p2p-1.pem" ubuntu@ec2-13-233-102-227.ap-south-1.compute.amazonaws.com"
alias 1-trainer="ssh -i "Desktop/libp2p/P2P-Federated-Learning/aws-keys/p2p-1.pem"  ubuntu@ec2-13-201-226-238.ap-south-1.compute.amazonaws.com"
alias 2-trainer="ssh -i "Desktop/libp2p/libp2p-aws.pem" ubuntu@ec2-13-126-88-127.ap-south-1.compute.amazonaws.com"
alias raspi="ssh soi@192.168.12.130"

# --CLOUDFLARE--
alias cld-start="sudo systemctl start cloudflared"
alias cld-stop="sudo systemctl stop cloudflared"
alias cld-status="sudo systemctl status cloudflared"
alias cld="cloudflared"
