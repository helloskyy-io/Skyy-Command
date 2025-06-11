
## Operation:

  

#### local firewall configuration:

1. Put the API key into the .env file

2. Edit the path for the correct Ip address of your firewall

  

Test initial functionality with:

```bash

python3 /components/firewall/pfsense/test_connection.py

```

Put the list of desired public/local IPs with MAC into the desired_state/networking/networking_hargett_yaml

Push all public virtual IPs with:

```bash

python3 components/firewall/pfsense/ops/manage_vips.py

python3 components/firewall/pfsense/ops/manage_rules.py

```

  
  
  

#### local server configuration:

1. Define the server end state via form, or yaml in the desired_state folder.

2. Run the SSH boot strap so Ansible can log in via SSH key (passwordless)

  

As root:

```bash

cd ~/Repos/skyy-command

ansible-playbook -i "192.168.210.106," -u root --ask-pass ansible/playbooks/ssh_bootstrap.yaml

```

As a non root user with sudo privledges

```bash

cd ~/Repos/skyy-command

ansible-playbook -i "69.69.69.2," -u sirpoopsalot --ask-pass --ask-become-pass ansible/playbooks/ssh_bootstrap.yaml

```

  

3. Run the dynamic_inventory.py script to generate a new inventory file.

Run Ansible to compare and configure the servers. (Currently assumes Proxmox, can add more later on)

(To-do) add in something so that boot strap doesnt have to be re_ran after cluster join

(To-do) create a way to parse hosts instead of hardcoding one IP address

(To_do) removing the pop up about subscription is failing to work (low priority)

(To-do) integrate automation to copy the Ceph key and config, and add to Proxmox

(To-do) look into some of this automation: https://github.com/Meliox/PVE-mods

  

old method:

```bash

ansible-playbook -i scripts/inventory_hosts_local.py ansible/playbooks/configure_hosts_local.yaml

```

new method:

```bash

python3 backend/tasks/configure_proxmox_hosts.py

```

  
  
  

to save the requirements out from Conda

```bash

conda env export --from-history > environment.yaml

  
  
  
  
  
  

#### FluxEdge server configuration:

1. Put FluxEdge API key into the .env file

  

```bash

FLUXEDGE_API_KEY=your-api-key-goes-here

```

  

2. Set up the CLI tool

  

```bash

ansible-playbook ansible/playbooks/configure_cli_tool.yaml

```

3. Run CLI based calls against FluxEdge platform using Python scripting

  

```bash

python3 components/flux_edge_integrations/cli_tool/scripts/check_balance.py

```

  
  
  
  

#### VM configurations:

  

FluxEdge configuration:

  

1. Run the SSH boot strap so Ansible can log in via SSH key (passwordless)

  

As a non root user with sudo privledges:

```bash

cd ~/Repos/skyy-command

ansible-playbook -i "192.168.120.112," -u sirpoopsalot --ask-pass --ask-become-pass ansible/playbooks/ssh_bootstrap.yaml

```

  

2. Configure VM as a FluxCore node:

```bash

ansible-playbook -i "192.168.120.112," ansible/playbooks/configure_fluxedge.yaml

```

TODO: create a reset hash option as fluxedge picks up cloned VMs as duplicate nodes erroneously

  
  
  
  

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

  

Create Deployments: (unifi controller)

```bash

ansible-playbook -i "69.69.69.12," ansible/playbooks/configure_deployment.yaml

```

  
  
  

For running our own GPU dockers (not on Edge):

  

install and configure the VM:

  

Clone the template:

assign CPU and memory to the template clone

resize the disk as needed!

  

boot strap it for Ansible:

```bash

ansible-playbook -i "192.168.120.108," -u sirpoopsalot --ask-pass --ask-become-pass ansible/playbooks/ssh_bootstrap.yaml

```

INSTALL NVIDIA DRIVERS!

sudo apt install nvidia-driver-550-server

reboot, and verify with nvidia-smi

  

install docker and nvidia runtime:

```bash

ansible-playbook -i "192.168.120.108," ansible/playbooks/configure_docker_gpu_vm.yaml

```

  
  
  
  

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

  

To-do:

copy data out to the host for instant restore (WIP)

note the file structure, for backup/restore (WIP)

  

Access:

Uptime-kuma:

http://192.168.90.83:3001/dashboard

Grafana:

  
  
  
  

Create Deployments: (Timpi Synaptron)

  

Copy the files to the host:

```bash

rsync -avz deployments/puma-server-011/ sirpoopsalot@192.168.120.111:/home/sirpoopsalot/

rsync -avz deployments/.env.host sirpoopsalot@192.168.120.111:/home/sirpoopsalot/

```

  

Create and run the containers:

sudo docker compose -f docker-compose.synaptron-002.yaml --env-file .env.host up -d --force-recreate

  

Additioal commands:nvidia

removal:

sudo docker stop timpi-synaptron-027

sudo docker rm timpi-synaptron-027

sudo docker stop kuma-monitor-027

sudo docker rm kuma-monitor-027

  

remove all:exit

sudo docker stop $(sudo docker ps -aq)

sudo docker rm $(sudo docker ps -aq)

  

remove unused networks:

sudo docker network prune -f

  

remove unnused images and networks:

sudo docker system prune -a --volumes

  

verify vars internally:

sudo docker exec -it timpi-synaptron-021 env

  

stream logs:

sudo docker logs -f timpi-synaptron-024

  

drop into the container:

sudo docker exec -it timpi-synaptron-006 /bin/bash

  
  
  
  

### Running the gpu_agent to manage GPU temps dynamically:

  

create the missing directory on the remote server:

```bash

ssh sirpoopsalot@192.168.120.107

sudo mkdir -p /opt/skyy/gpu_agent

sudo chown sirpoopsalot:sirpoopsalot /opt/skyy/gpu_agent

```

  

copy over the folder structure from the parent program to the remote server:

```bash

rsync -avz components/gpu_agent/ sirpoopsalot@192.168.120.107:/opt/skyy/gpu_agent/

```

  

test the application for fuctionality:

```bash

sudo apt install python3-pip && sudo apt install python3.12-venv

python3 -m venv venv

cd /opt/skyy/gpu_agent

source venv/bin/activate

pip install -r requirements.txt

python3 main.py --config local_config/gpu_config.yaml

python3 main.py --config local_config/gpu_config.yaml --debug

  

```

  
  

#### Manually Set Nvidia Overclocking in Ubuntu Server ####

  

# configuring OC in server is a little more conplicated than desktop

# Assuming you have Nvidia cards

# Install xorg

sudo apt-get install xorg

  

# install nvidia settings

sudo apt install nvidia-settings

  

# manually start xserver to run in background and log to file (doesnt automatically start without a display)

sudo bash -c "Xorg :0 > /var/log/Xorg.0.log 2>&1 &"

  

# verify xserver is running

ps -e | grep X

  

# set up a virtual display since this is a server install there is no dispalay by default

nohup DISPLAY=:0 XAUTHORITY=/run/user/$(id -u)/gdm/Xauthority nvidia-settings > /dev/null 2>&1 &

  

# add cool bits to nvidia-settings (check to see if you have an xorg.conf file, mine didnt appear initially)

sudo nvidia-xconfig --cool-bits=4

  

# verify in config

sudo nano /etc/X11/xorg.conf

  

# should look similar to this (it might say file doesnt exist, and its creating it now)

Section "Device"

Identifier "Device0"

Driver "nvidia"

VendorName "NVIDIA Corporation"

EndSection

  

Section "Screen"

Identifier "Screen0"

Device "Device0"

Monitor "Monitor0"

DefaultDepth 24

Option "Coolbits" "4"

SubSection "Display"

Depth 24

EndSubSection

EndSection

# Fix Nvidia error

sudo nano /etc/X11/Xwrapper.config

  

# add the follwing

allowed_users=anybody

needs_root_rights=yes

  

# enable persistence mode

sudo nvidia-smi -pm 1

  

# now we can set power limit and set static fan speeds on the GPUs

# check the Nvidia settings to make sure you have them

nvidia-smi

  

# set power limits for one GPU

sudo nvidia-smi -pl 130

  

# set power limits for multi GPU (number following the -i indicates GPU number)

sudo nvidia-smi -i 0 -pl 257

sudo nvidia-smi -i 1 -pl 130

  

# set fan speeds

# run this command to enable fan control (change GPU#, power setting, and fan speed as needeed)

# this command is slightly different than the Ubuntu desktop in that you have to add the display at the beginning to match the previously added virtual display

DISPLAY=:0 sudo nvidia-settings -a '[gpu:0]/GPUFanControlState=1'

DISPLAY=:0 sudo nvidia-settings -a '[gpu:1]/GPUFanControlState=1'

DISPLAY=:0 sudo nvidia-settings -a '[gpu:2]/GPUFanControlState=1'

DISPLAY=:0 sudo nvidia-settings -a '[gpu:3]/GPUFanControlState=1'

DISPLAY=:0 sudo nvidia-settings -a '[gpu:4]/GPUFanControlState=1'

DISPLAY=:0 sudo nvidia-settings -a '[gpu:5]/GPUFanControlState=1'

DISPLAY=:0 sudo nvidia-settings -a '[gpu:6]/GPUFanControlState=1'

DISPLAY=:0 sudo nvidia-settings -a '[gpu:7]/GPUFanControlState=1'

DISPLAY=:0 sudo nvidia-settings -a '[gpu:8]/GPUFanControlState=1'

DISPLAY=:0 sudo nvidia-settings -a '[gpu:9]/GPUFanControlState=1'

  

DISPLAY=:0 sudo nvidia-settings -a '[fan:0]/GPUTargetFanSpeed=50'

DISPLAY=:0 sudo nvidia-settings -a '[fan:1]/GPUTargetFanSpeed=50'

DISPLAY=:0 sudo nvidia-settings -a '[fan:2]/GPUTargetFanSpeed=50'

DISPLAY=:0 sudo nvidia-settings -a '[fan:3]/GPUTargetFanSpeed=50'

DISPLAY=:0 sudo nvidia-settings -a '[fan:4]/GPUTargetFanSpeed=50'

DISPLAY=:0 sudo nvidia-settings -a '[fan:5]/GPUTargetFanSpeed=50'

DISPLAY=:0 sudo nvidia-settings -a '[fan:6]/GPUTargetFanSpeed=50'

DISPLAY=:0 sudo nvidia-settings -a '[fan:7]/GPUTargetFanSpeed=50'

DISPLAY=:0 sudo nvidia-settings -a '[fan:8]/GPUTargetFanSpeed=50'

DISPLAY=:0 sudo nvidia-settings -a '[fan:9]/GPUTargetFanSpeed=50'

  
  

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

proxmox-storage-setup/ # Configures local-lvm, thinpools, etc.

proxmox-cluster-join/ # Runs `pvecm add` with peer IP + SSH

tailscale

ceph

  

maintenance roles:

go into components/skylab and take the proxmox base updates and rework as needed for skyycommand

create method to update flux edge CLI tool (automate comparing git versioning)

  

deployments:

plan and create "desired state" files for standard deployments (Timpi > synaptron > customer)

implement and install FluxEdge CLI tool into "components"

deployment roles:

fluxedge-deployment-timpi-synaptron # Automates deployment of Synaptron via CLI tool/API

add ability to change host name as asked and then reboot

add ability to create a dhcp reservation in pfsense

  
  

integrate FluxEdge CLI tool into our application

Create basic scripting utilizing the CLI tool's json output

  
  

#### complete! woohoo!

  

1. Create dynamic inventory from desired_state/hosts/ in json on the fly

2. Create global config.yaml with organization-wide and module-specific logic

3. Well-documented project structure (file structure.txt in docs)

4. Reusable, role-based task inclusion with conditionals for provisioning servers:

  

playbooks:

host provisioning:

Passwordless SSH bootstrap # Adds SSH leys for Ansible and enables passwordless login

proxmox-repo-update # Removes enterprise repos (conditionally based on config.yaml)

proxmox-subscription-popup # Removes "no subscription" nag

  

roles:

host provisioning:

proxmox-repo-cleanup/ # Handles enterprise -> community repo switch

  

5. CLI based access to FluxEdge

  
  
  
  
  
  

#### onboard intelligence

(simple if/then logic based decision tree, or implement a small CPU based neural network model?)

  

┌────────────────────────┐

│ 1. A new deployment is │

│ requested or needs │

│ rescheduling │

└────────────┬───────────┘

│

▼

┌────────────────────────────────────────────┐

│ 2. Match requirements: │

│ - GPU type / VRAM │

│ - RAM / Storage │

│ - Location preference / latency │

│ - Redundancy / HA required? │

└────────────┬───────────────────────────────┘

│

▼

┌────────────────────────────────────────────┐

│ 3. Search HelloSkyy-owned servers │

│ - Filter for availability, tags, health │

│ - Prefer high-utilization servers │

│ - Reserve slots temporarily │

└────────────┬───────────────────────────────┘

│

If match found:

│

├──> ✅ Assign deployment to HelloSkyy server

│

Else:

▼

┌────────────────────────────────────────────┐

│ 4. Search FluxEdge marketplace │

│ - Prefer your own nodes first │

│ - Score available nodes by: │

│ - Cost / hour │

│ - Online time / reliability │

│ - Location or specs │

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