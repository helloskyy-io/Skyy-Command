
Create standard/permanent deployments:

Create Docker containers for private and public use

Boot strap VM for Ansible:

As a non root user with sudo privledges
```bash
cd ~/Repos/skyy-command
ansible-playbook -i "69.69.69.12," -u sirpoopsalot --ask-pass --ask-become-pass ansible/playbooks/ssh_bootstrap.yaml
```

install and configure the VM:
```bash
ansible-playbook -i "69.69.69.12," ansible/playbooks/configure_docker_vm.yaml
```

Create Deployments: (unifi controller)
```bash
ansible-playbook -i "69.69.69.12," ansible/playbooks/configure_deployment.yaml
```


### TO-DO
1. configure_deployment.yaml is not flexible enough to accommodate many types of deployments. Either rename for "unifi controller", or develop into generic reusable deployment engine.