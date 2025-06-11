FluxEdge configuration:

1. Run the SSH boot strap so Ansible can log in via SSH key (passwordless)
	(As a non root user with sudo privledges:)

```bash
cd ~/Repos/skyy-command
ansible-playbook -i "192.168.120.112," -u sirpoopsalot --ask-pass --ask-become-pass ansible/playbooks/ssh_bootstrap.yaml
```

2. Configure VM as a FluxCore node:
```bash
ansible-playbook -i "192.168.120.112," ansible/playbooks/configure_fluxedge.yaml
```

### TO-DO: 
1. create a reset hash option as fluxedge picks up cloned VMs as duplicate nodes erroneously. This is currently a problem. Find source of detection, and resolve. 