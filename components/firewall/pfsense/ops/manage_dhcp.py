# components/firewall/pfsense/ops/manage_dhcp.py

import sys
import yaml
from pathlib import Path

# Add the root project directory to sys.path
sys.path.append(str(Path(__file__).resolve().parents[4]))

from components.firewall.pfsense.lib.dhcp import create_many, list_static_mappings

def load_dhcp_reservations_from_yaml(yaml_path):
    with open(yaml_path, 'r') as f:
        config = yaml.safe_load(f)

    reservations = []
    for entry in config.get("ips", []):
        if "mac" in entry and "internal_ip" in entry:
            reservations.append({
                "mac": entry["mac"],
                "internal_ip": entry["internal_ip"]
            })
    return reservations

def main():
    yaml_path = Path(__file__).resolve().parents[4] / "desired_state/networking/networking_hargett.yaml"
    desired_reservations = load_dhcp_reservations_from_yaml(yaml_path)

    if not desired_reservations:
        print("[⚠️] No DHCP reservations found in YAML file.")
        return

    existing_macs = list_static_mappings()

    print(f"[🔍] Desired DHCP reservations from YAML: {len(desired_reservations)}")
    print(f"[📡] Existing DHCP reservations on firewall: {len(existing_macs)}")

    to_create = [r for r in desired_reservations if r["mac"] not in existing_macs]

    if not to_create:
        print("[✅] All DHCP reservations already exist — nothing to do.")
        return

    print(f"[➕] Will create {len(to_create)} new DHCP reservation(s):")
    for r in to_create:
        print(f"     - {r['mac']} → {r['internal_ip']}")

    create_many(to_create)

if __name__ == "__main__":
    main()