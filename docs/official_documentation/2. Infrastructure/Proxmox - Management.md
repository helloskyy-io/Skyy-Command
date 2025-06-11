
#### local server configuration: (new host)

1. Define the server end state via form, or yaml in the desired_state folder.
2. Run the SSH boot strap so Ansible can log in via SSH key (passwordless)

As root:
```bash
cd ~/Repos/skyy-command
ansible-playbook -i "192.168.210.106," -u root --ask-pass ansible/playbooks/ssh_bootstrap.yaml
```

As a non root user with sudo privileges
```bash
cd ~/Repos/skyy-command
ansible-playbook -i "69.69.69.2," -u sirpoopsalot --ask-pass --ask-become-pass ansible/playbooks/ssh_bootstrap.yaml
```

3. Run the dynamic_inventory.py script to generate a new inventory file.


Run Ansible to compare and configure the servers. (Currently assumes Proxmox, can add more later on)

(To-do) add in something so that boot strap doesn't have to be re_ran after cluster join, if we disable password based login.
(To-do) create a way to parse hosts instead of hardcoding one IP address
(To_do) removing the pop up about subscription is failing to work (low priority)
(To-do) integrate automation to copy the Ceph key and config, and add to Proxmox
(To-do) look into some of this automation: https://github.com/Meliox/PVE-mods

old method: (Running directly at the playbook level
```bash
ansible-playbook -i scripts/inventory_hosts_local.py ansible/playbooks/configure_hosts_local.yaml
```

new method: (Running at the Django wrapper level)
```bash
python3 backend/tasks/configure_proxmox_hosts.py
```

