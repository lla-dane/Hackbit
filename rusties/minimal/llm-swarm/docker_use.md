Build the image
```bash 
docker build -t <name> .
```

Run the container with a terminal (best)
```bash
docker -it -p 8080:8080 -name <name> <image-name> /bin/bash

docker start -i <name>
```
