## Operation:

#### server configuration:
1. Define the server end state via form, or yaml in the desired_state folder.
2. Run the SSH boot strap so Ansible can log in via SSH key

cd ~/Repos/skyy-command
ansible-playbook -i "192.168.210.107," -u root --ask-pass ansible/playbooks/ssh_bootstrap.yaml

3. Run the dynamic_inventory.py script to generate a new inventory file. 
3. Run Ansible to compare and configure the servers.

ansible-playbook -i scripts/inventory_hosts.py ansible/playbooks/configure_hosts.yaml
