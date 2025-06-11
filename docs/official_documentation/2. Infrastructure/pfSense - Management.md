

(this is a WIP and needs to be revised to reflect our use of public static IP addresses)
### local firewall configuration:

1. Retrieve the API key from pfSense and place it into the .env file at project root

2. Edit the path in the .env file for the correct Ip address or domain name of your firewall

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

