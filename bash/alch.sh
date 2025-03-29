#!/usr/bin/env bash
LOG_FILE="$1"

tail -F "$LOG_FILE" | while read -r line; do
    read -ra fields <<< "$line"
    status_code="${fields[8]}"
    
    if [[ "$status_code" == "500" ]]; then
        path="${fields[6]}"
        echo alert@project.com "HTTP 500 on $path"
    fi
done