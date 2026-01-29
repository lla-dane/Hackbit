#!/usr/bin/env bash

WALLPAPER_DIR="$HOME/Documents/Live_Wallpapers"

# Screen geometries
LEFT_GEOM="2560x1440+0+0"
RIGHT_GEOM="1920x1080+2560+0"

while true; do
    # Pick two DIFFERENT random wallpapers
    LEFT_FILE=$(find "$WALLPAPER_DIR" -type f -iname "*.mp4" | shuf -n 1)
    RIGHT_FILE=$(find "$WALLPAPER_DIR" -type f -iname "*.mp4" | shuf -n 1)

    # Prevent both screens showing the same file (not guaranteed but likely)
    if [[ "$LEFT_FILE" == "$RIGHT_FILE" ]]; then
        RIGHT_FILE=$(find "$WALLPAPER_DIR" -type f -iname "*.mp4" | shuf -n 1)
    fi

    # Kill previous wallpapers
    pkill -f xwinwrap
    sleep 0.3

    # Run on LEFT (HDMI)
    xwinwrap -g "$LEFT_GEOM" -ov -un -ni -- \
        mpv --no-audio --loop --no-osc --no-osd-bar --really-quiet \
        --panscan=1.0 --wid=%WID "$LEFT_FILE" &

    # Run on RIGHT (eDP)
    xwinwrap -g "$RIGHT_GEOM" -ov -un -ni -- \
        mpv --no-audio --loop --no-osc --no-osd-bar --really-quiet \
        --panscan=1.0 --wid=%WID "$RIGHT_FILE" &

    # Wait before switching again
    sleep 15
done
