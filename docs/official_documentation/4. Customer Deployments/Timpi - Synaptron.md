
Create Deployments: (Timpi Synaptron)

1. Copy the files to the host:
```bash
rsync -avz deployments/puma-server-011/ sirpoopsalot@192.168.120.111:/home/sirpoopsalot/
rsync -avz deployments/.env.host sirpoopsalot@192.168.120.111:/home/sirpoopsalot/
```

2. Create and run the containers:
```bash
sudo docker compose -f docker-compose.synaptron-002.yaml --env-file .env.host up -d --force-recreate
```



Additional commands for managing Synaptrons:

removal: (manual)
```bash
sudo docker stop timpi-synaptron-027
sudo docker rm timpi-synaptron-027
sudo docker stop kuma-monitor-027
sudo docker rm kuma-monitor-027
```

remove all:
```bash
sudo docker stop $(sudo docker ps -aq)
sudo docker rm $(sudo docker ps -aq)
```
  
remove unused networks:
```bash
sudo docker network prune -f
```

remove unnused images and networks:
```bash
sudo docker system prune -a --volumes
```

verify vars internally:
```bash
sudo docker exec -it timpi-synaptron-021 env
```

stream logs:
```bash
sudo docker logs -f timpi-synaptron-024
```
  
drop into the container:
```bash
sudo docker exec -it timpi-synaptron-006 /bin/bash
```

