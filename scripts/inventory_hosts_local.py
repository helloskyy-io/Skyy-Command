#!/usr/bin/env python3

import os
import sys
import yaml
import json

INVENTORY_PATH = './desired_state/hosts_local'

# --- Validate the desired state directory exists ---
if not os.path.exists(INVENTORY_PATH):
    print(f"[ERROR] Host inventory path '{INVENTORY_PATH}' does not exist.", file=sys.stderr)
    sys.exit(1)

host_files = [f for f in os.listdir(INVENTORY_PATH) if f.endswith((".yml", ".yaml"))]

if not host_files:
    print(f"[ERROR] No host config files found in '{INVENTORY_PATH}'.", file=sys.stderr)
    sys.exit(1)

# --- Base inventory format ---
inventory = {
    "_meta": {
        "hostvars": {}
    },
    "all": {
        "hosts": []
    }
}

# --- Process each host config ---
for file in host_files:
    filepath = os.path.join(INVENTORY_PATH, file)
    print(f"[INFO] Processing host file: {file}", file=sys.stderr)

    try:
        with open(filepath, 'r') as f:
            host_data = yaml.safe_load(f)

        # --- Validate required fields ---
        if not host_data:
            raise ValueError("Empty or invalid YAML format.")
        if "hostname" not in host_data or "ip_address" not in host_data:
            raise KeyError("Missing required fields: 'hostname' or 'ip_address'.")

        hostname = host_data["hostname"]
        ip = host_data["ip_address"]

        # --- Add host to inventory ---
        inventory["all"]["hosts"].append(ip)
        inventory["_meta"]["hostvars"][ip] = {
            "hostname": hostname,
            "tailscale_hostname": host_data.get("tailscale_hostname"),
            "roles": host_data.get("roles", []),
            "settings": host_data.get("settings", {}),
            "tags": host_data.get("tags", []),
            "notes": host_data.get("notes", "")
        }

    except Exception as e:
        print(f"[ERROR] Failed to process {file}: {e}", file=sys.stderr)

# --- Output JSON to stdout (required by Ansible) ---
print(json.dumps(inventory, indent=2))
