# components/firewall/pfsense/ops/manage_nats.py

import sys
import yaml
from pathlib import Path

# Add the root project directory to sys.path
sys.path.append(str(Path(__file__).resolve().parents[4]))

from components.firewall.pfsense.lib.nats import create_many, list_nats

def load_nat_mappings_from_yaml(yaml_path):
    with open(yaml_path, 'r') as f:
        config = yaml.safe_load(f)

    mappings = []
    for entry in config.get("ips", []):
        if "public_ip" in entry and "internal_ip" in entry:
            mappings.append({
                "public_ip": entry["public_ip"],
                "internal_ip": entry["internal_ip"]
            })
    return mappings

def main():
    yaml_path = Path(__file__).resolve().parents[4] / "desired_state/networking/networking_hargett.yaml"
    desired_nats = load_nat_mappings_from_yaml(yaml_path)

    if not desired_nats:
        print("[⚠️] No NAT mappings found in YAML file.")
        return

    existing_nats = list_nats()

    print(f"[🔍] Desired NAT mappings from YAML: {len(desired_nats)}")
    print(f"[📡] Existing NAT mappings on firewall: {len(existing_nats)}")

    to_create = [entry for entry in desired_nats if entry["public_ip"] not in existing_nats]

    if not to_create:
        print("[✅] All NAT mappings already exist — nothing to do.")
        return

    print(f"[➕] Will create {len(to_create)} new NAT(s):")
    for nat in to_create:
        print(f"     - {nat['public_ip']} → {nat['internal_ip']}")

    create_many(to_create)

if __name__ == "__main__":
    main()
