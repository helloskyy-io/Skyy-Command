
For running our own GPU dockers (not on Edge):
1. install and configure the VM:
2. Clone the template:
3. assign CPU and memory to the template clone
4. resize the disk as needed!

boot strap it for Ansible:
```bash
ansible-playbook -i "192.168.120.108," -u sirpoopsalot --ask-pass --ask-become-pass ansible/playbooks/ssh_bootstrap.yaml
```

5. INSTALL NVIDIA DRIVERS!
```bash
sudo apt install nvidia-driver-550-server
```

6. reboot, and verify with nvidia-smi
7. install docker and nvidia runtime:
```bash
ansible-playbook -i "192.168.120.108," ansible/playbooks/configure_docker_gpu_vm.yaml
```


## TO-DO:
1. incorporate nvidia driver installation
2. revise instructions as more of the manual steps are added!

