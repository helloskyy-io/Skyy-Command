# components/firewall/pfsense/ops/manage_rules.py

import sys
import yaml
from pathlib import Path

# Add the root project directory to sys.path
sys.path.append(str(Path(__file__).resolve().parents[4]))

from components.firewall.pfsense.lib.rules import create_many_dmz_rules, list_dmz_rules

def load_internal_ips_from_yaml(yaml_path):
    with open(yaml_path, 'r') as f:
        config = yaml.safe_load(f)

    internal_ips = []
    for entry in config.get("ips", []):
        if "internal_ip" in entry:
            internal_ips.append(entry["internal_ip"])
    return internal_ips

def main():
    yaml_path = Path(__file__).resolve().parents[4] / "desired_state/networking/networking_hargett.yaml"
    desired_ips = load_internal_ips_from_yaml(yaml_path)

    if not desired_ips:
        print("[⚠️] No internal IPs found in YAML file.")
        return

    existing_rules = list_dmz_rules()

    print(f"[🔍] Desired DMZ rules from YAML: {len(desired_ips)}")
    print(f"[📡] Existing DMZ rules on firewall: {len(existing_rules)}")

    to_create = [ip for ip in desired_ips if ip not in existing_rules]

    if not to_create:
        print("[✅] All DMZ rules already exist — nothing to do.")
        return

    print(f"[➕] Will create {len(to_create)} new DMZ rule(s):")
    for ip in to_create:
        print(f"     - {ip}")

    create_many_dmz_rules(to_create)

if __name__ == "__main__":
    main()
