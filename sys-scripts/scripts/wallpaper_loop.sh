#!/usr/bin/env bash

# Folder containing your wallpapers
WALLPAPER_DIR="$HOME/Documents/Wallpapers"
STATS_FILE="$HOME/Documents/logs/wallpaper_stats.csv"

# Create stats file with header if it doesn't exist
if [[ ! -f "$STATS_FILE" ]]; then
    echo "Wallpaper,Screen0,Screen1" > "$STATS_FILE"
fi

# Function to update the stats file
update_stats() {
    local wall="$1"
    local screen="$2"

    # Escape wallpaper path for grep
    local esc=$(printf "%s" "$wall" | sed 's/[][\.*^$/]/\\&/g')

    # Check if the wallpaper already exists in the CSV
    if grep -q "^$esc," "$STATS_FILE"; then
        # Extract current values
        row=$(grep "^$esc," "$STATS_FILE")
        s0=$(echo "$row" | cut -d ',' -f2)
        s1=$(echo "$row" | cut -d ',' -f3)

        # Increment based on screen
        if [[ "$screen" == "0" ]]; then
            s0=$((s0 + 1))
        else
            s1=$((s1 + 1))
        fi

        # Replace the updated row
        sed -i "s|^$esc,.*|$wall,$s0,$s1|" "$STATS_FILE"
    else
        # New wallpaper: initialize counts
        if [[ "$screen" == "0" ]]; then
            echo "$wall,1,0" >> "$STATS_FILE"
        else
            echo "$wall,0,1" >> "$STATS_FILE"
        fi
    fi
}

# Check if directory exists
if [[ ! -d "$WALLPAPER_DIR" ]]; then
    echo "Wallpaper directory not found: $WALLPAPER_DIR"
    exit 1
fi

while true; do
    # Pick random wallpapers
    WALL1=$(find "$WALLPAPER_DIR" -type f \( -iname '*.jpg' -o -iname '*.png' \) | shuf -n 1)
    WALL2=$(find "$WALLPAPER_DIR" -type f \( -iname '*.jpg' -o -iname '*.png' \) | shuf -n 1)

    # Apply wallpapers
    nitrogen --set-zoom-fill "$WALL1" --head=0 --save
    nitrogen --set-zoom-fill "$WALL2" --head=1 --save

    # Update stats
    update_stats "$WALL1" 0
    update_stats "$WALL2" 1

    sleep 15
done
