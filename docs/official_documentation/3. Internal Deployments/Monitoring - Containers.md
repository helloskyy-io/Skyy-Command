
Create Create monitoring:

boot strap the VM for Ansible access:
```bash
ansible-playbook -i "192.168.90.83," -u sirpoopsalot --ask-pass --ask-become-pass ansible/playbooks/ssh_bootstrap.yaml
```

install Docker:
```bash
ansible-playbook -i "192.168.90.83," ansible/playbooks/configure_docker_vm.yaml
```

Copy files to host:
```bash
scp -r deployments/monitoring_puma sirpoopsalot@192.168.90.83:~
```

then remote into the machine and run
```bash
sudo mkdir -p /opt/grafana/data
sudo mkdir -p /opt/grafana/dashboards
sudo mkdir -p /opt/grafana/provisioning
sudo chown -R 472:472 /opt/grafana/data
sudo chown -R 472:472 /opt/grafana/dashboards
sudo chown -R 472:472 /opt/grafana/provisioning
cd ~/monitoring_puma
sudo docker compose --env-file .env.monitoring-puma -f docker-compose.monitoring.yaml up -d
```

or if you want to bring just one up you can remove that one and rebuild only the one giving you issues!
```bash
docker rm -f uptime-kuma
docker compose --env-file .env.monitoring-puma -f docker-compose.monitoring.yaml up -d --force-recreate uptime-kuma
```

  
## TO-DO:

1. include more of these steps as a single call!
2. copy data out to the host for instant restore (WIP)
3. note the file structure, for backup/restore (WIP)
4. fix/finish the below access notes
  
Access:
Uptime-kuma:
http://192.168.90.83:3001/dashboard

Grafana:
;laksjdf;alkjsdf
