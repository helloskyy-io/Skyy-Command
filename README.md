## Operation:

#### server configuration:
1. Define the server end state via form, or yaml in the desired_state folder.
2. Run the SSH boot strap so Ansible can log in via SSH key (passwordless)

```bash
cd ~/Repos/skyy-command
ansible-playbook -i "192.168.210.107," -u root --ask-pass ansible/playbooks/ssh_bootstrap.yaml
```

3. Run the dynamic_inventory.py script to generate a new inventory file. 
4. Run Ansible to compare and configure the servers. (Currently assumes Proxmox, can add more later on)

```bash
ansible-playbook -i scripts/inventory_hosts_local.py ansible/playbooks/configure_hosts_local.yaml
```

6. Put FluxEdge API key into the .env file

```bash
FLUXEDGE_API_KEY=your-api-key-goes-here
```

7. Set up the CLI tool

```bash
ansible-playbook ansible/playbooks/configure_cli_tool.yaml
```
8. Run CLI based calls against FluxEdge platform using Python scripting

```bash
python3 components/flux_edge_integrations/cli_tool/scripts/check_balance.py
```








#### planning

1. Create global config file so settings are easily reconfigured for other companies
2. Build Ansible to automate various processes to provision servers for intended use automatically
3. Utilize desired end state files to define what we want. 
4. Build Ansible to automate various processes to achieve desired end state.
5. Implement same thing for Flux Edge (utilizing API calls via the CLI tool json options)
6. Utilize Django services to compare actual state with end state and kick off ansible tasks to achieve
desired end state automatically
7. Implement monitoring visualizations, and alerts for failures requiring intervention


Next steps!!!!

host provisioning roles:
    proxmox-storage-setup/      # Configures local-lvm, thinpools, etc.
    proxmox-cluster-join/       # Runs `pvecm add` with peer IP + SSH
    tailscale
    ceph

maintenance roles:
    go into components/skylab and take the proxmox base updates and rework as needed for skyycommand
    create method to update flux edge CLI tool (automate comparing git versioning)

deployments:
    plan and create "desired state" files for standard deployments (Timpi > synaptron > customer)
    implement and install FluxEdge CLI tool into "components"
    deployment roles:
        fluxedge-deployment-timpi-synaptron  # Automates deployment of Synaptron via CLI tool/API 
        
integrate FluxEdge CLI tool into our application
Create basic scripting utilizing the CLI tool's json output


#### complete! woohoo!

1. Create dynamic inventory from desired_state/hosts/ in json on the fly
2. Create global config.yaml with organization-wide and module-specific logic
3. Well-documented project structure (file structure.txt in docs)
4. Reusable, role-based task inclusion with conditionals for provisioning servers:

    playbooks:
        host provisioning:
            Passwordless SSH bootstrap  # Adds SSH leys for Ansible and enables passwordless login
            proxmox-repo-update         # Removes enterprise repos (conditionally based on config.yaml)
            proxmox-subscription-popup  # Removes "no subscription" nag

    roles:
        host provisioning:
            proxmox-repo-cleanup/       # Handles enterprise -> community repo switch

5. CLI based access to FluxEdge






#### onboard intelligence 
(simple if/then logic based decision tree, or implement a small CPU based neural network model?)

┌────────────────────────┐
│ 1. A new deployment is │
│    requested or needs  │
│    rescheduling        │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ 2. Match requirements:                     │
│    - GPU type / VRAM                       │
│    - RAM / Storage                         │
│    - Location preference / latency         │
│    - Redundancy / HA required?             │
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ 3. Search HelloSkyy-owned servers          │
│    - Filter for availability, tags, health │
│    - Prefer high-utilization servers       │
│    - Reserve slots temporarily             │
└────────────┬───────────────────────────────┘
             │
     If match found:
             │
             ├──> ✅ Assign deployment to HelloSkyy server
             │
     Else:
             ▼
┌────────────────────────────────────────────┐
│ 4. Search FluxEdge marketplace             │
│    - Prefer your own nodes first           │
│    - Score available nodes by:             │
│      - Cost / hour                         │
│      - Online time / reliability           │
│      - Location or specs                   │
└────────────┬───────────────────────────────┘
             │
             ├──> ✅ Assign deployment to best-fit rented node
             ▼
     If no match found:
     Alert + Backoff or notify human




#### ansible commands

to create a new role scafold

cd ansible/roles/
ansible-galaxy init proxmox-repo-update
