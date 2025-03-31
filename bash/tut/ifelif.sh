#!/bin/bash

if [ ${1,,} = shelby ]; then
	echo "Oh, you are the boss here, welcome!"
elif [ ${1,,} = help ]; then 
	echo "Just enter the username, duh!"
else 
	echo "i dont know who you are but you are not the boss of me!"
fi
