# components/firewall/pfsense/ops/manage_vips.py

import sys
import yaml
from pathlib import Path


# Add the root project directory to sys.path
sys.path.append(str(Path(__file__).resolve().parents[4]))

from components.firewall.pfsense.lib.vips import create_many
from components.firewall.pfsense.lib.vips import list_vips

def load_public_ips_from_yaml(yaml_path):
    with open(yaml_path, 'r') as f:
        config = yaml.safe_load(f)

    ip_list = []
    for entry in config.get("ips", []):
        if "public_ip" in entry:
            ip_list.append(entry["public_ip"])
    return ip_list

def main():
    yaml_path = Path(__file__).resolve().parents[4] / "desired_state/networking/networking_hargett.yaml"
    desired_ips = load_public_ips_from_yaml(yaml_path)

    if not desired_ips:
        print("[⚠️] No public IPs found in YAML file.")
        return

    existing_ips = list_vips()

    print(f"[🔍] Desired IPs from YAML: {len(desired_ips)}")
    print(f"[📡] Existing VIPs on firewall: {len(existing_ips)}")

    to_create = [ip for ip in desired_ips if ip not in existing_ips]

    if not to_create:
        print("[✅] All VIPs already exist — nothing to do.")
        return

    print(f"[➕] Will create {len(to_create)} new VIP(s):")
    for ip in to_create:
        print(f"     - {ip}")

    create_many(to_create)

if __name__ == "__main__":
    main()
