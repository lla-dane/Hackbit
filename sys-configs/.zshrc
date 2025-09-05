# Enable history
HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000


export PATH="$HOME/.local/protoc-25.3/bin:$PATH"
export PATH="$PATH:$(go env GOPATH)/bin"
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

# Power profiles
alias power-high="asusctl profile -P Performance"
alias power-mid="asusctl profile -P Balanced"
alias power-low="asusctl profile -P Quiet"
alias power="asusctl profile -p"

# GPU profiles
alias gpu-integrated="supergfxctl -m Integrated"
alias gpu-dedicated="supergfxctl -m AsusMuxDgpu"
alias gpu-get="supergfxctl -g"

# Aliases
alias open='xdg-open'
alias terminal='gnome-terminal'
alias speed='fast'
alias cur='cursor'

# Docker
alias docker-start='sudo systemctl start docker'
alias docker-stop='sudo systemctl stop docker docker.socket'
alias docker-status='sudo systemctl status docker'

# Bluetooth
alias bluetooth='sudo systemctl start bluetooth'

# Backward path (cd..)
alias .1="cd .."
alias .2="cd ../.."
alias .3="cd ../../.."

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

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!

# __conda_setup="$('/home/shelby/miniconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
# if [ $? -eq 0 ]; then
#     eval "$__conda_setup"
# else
#     if [ -f "/home/shelby/miniconda3/etc/profile.d/conda.sh" ]; then
#         . "/home/shelby/miniconda3/etc/profile.d/conda.sh"
#     else
#         export PATH="/home/shelby/miniconda3/bin:$PATH"
#     fi
# fi
# unset __conda_setup

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
# Alias for running starkup installer
alias starkup="curl --proto '=https' --tlsv1.2 -sSf https://sh.starkup.sh | sh -s --"


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
