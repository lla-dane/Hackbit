#!/bin/bash

# A script to control volume and display a notification

# Use a consistent notification ID to replace the old notification
NOTIF_ID="991049"

# Function to send notification
send_notification() {
    # Check if muted
    IS_MUTED=$(pactl get-sink-mute @DEFAULT_SINK@ | grep -Po '(?<=Mute: ).*')

    if [ "$IS_MUTED" == "yes" ]; then
        # Show muted notification
        notify-send -r "$NOTIF_ID" \
                    -i notification-audio-volume-muted \
                    -h string:x-canonical-private-synchronous:volume \
                    "Volume Muted"
    else
        # Get current volume as a percentage number (e.g., "50")
        VOLUME=$(pactl get-sink-volume @DEFAULT_SINK@ | grep -Po '\d+(?=%)' | head -n 1)
        
        # Determine the icon based on volume level
        if [ "$VOLUME" -eq 0 ]; then
            ICON="notification-audio-volume-off"
        elif [ "$VOLUME" -lt 34 ]; then
            ICON="notification-audio-volume-low"
        elif [ "$VOLUME" -lt 67 ]; then
            ICON="notification-audio-volume-medium"
        else
            ICON="notification-audio-volume-high"
        fi
        
        # Send notification with volume level as a hint (for the progress bar)
        notify-send -r "$NOTIF_ID" \
                    -i $ICON \
                    -h int:value:$VOLUME \
                    -h string:x-canonical-private-synchronous:volume \
                    "Volume: ${VOLUME}%"
    fi
}

# Parse command-line arguments
case "$1" in
    up)
        # Increase volume by 5%
        pactl set-sink-volume @DEFAULT_SINK@ +5%
        send_notification
        ;;
    down)
        # Decrease volume by 5%
        pactl set-sink-volume @DEFAULT_SINK@ -5%
        send_notification
        ;;
    mute)
        # Toggle mute
        pactl set-sink-mute @DEFAULT_SINK@ toggle
        send_notification
        ;;
    *)
        echo "Usage: $0 {up|down|mute}"
        exit 1
        ;;
esac