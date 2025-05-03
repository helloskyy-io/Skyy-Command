#!/usr/bin/env python3

import os
import sys
import yaml
import json
from dotenv import load_dotenv, find_dotenv

# --- Load .env file ---
dotenv_path = find_dotenv()

if not dotenv_path or not os.path.exists(dotenv_path):
    print("[ERROR] .env file not found! Aborting.", file=sys.stderr)
    sys.exit(1)

load_dotenv(dotenv_path)
print(f"[INFO] Loaded .env from {dotenv_path}", file=sys.stderr)

# --- Grab ALL env vars from .env ---
env_vars = dict(os.environ)  

# --- Load config.yaml ---
CONFIG_PATH = './config.yaml'

if not os.path.exists(CONFIG_PATH):
    print(f"[ERROR] Global config '{CONFIG_PATH}' not found.", file=sys.stderr)
    sys.exit(1)

with open(CONFIG_PATH, 'r') as f:
    global_config = yaml.safe_load(f)

# --- Load desired_state/hosts_local ---
INVENTORY_PATH = './desired_state/hosts_local'

if not os.path.exists(INVENTORY_PATH):
    print(f"[ERROR] Host inventory path '{INVENTORY_PATH}' does not exist.", file=sys.stderr)
    sys.exit(1)

host_files = [f for f in os.listdir(INVENTORY_PATH) if f.endswith((".yml", ".yaml"))]

if not host_files:
    print(f"[ERROR] No host config files found in '{INVENTORY_PATH}'.", file=sys.stderr)
    sys.exit(1)

# --- Build inventory structure ---
inventory = {
    "_meta": {
        "hostvars": {}
    },
    "all": {
        "hosts": []
    }
}

for file in host_files:
    filepath = os.path.join(INVENTORY_PATH, file)
    print(f"[INFO] Processing host file: {file}", file=sys.stderr)

    try:
        with open(filepath, 'r') as f:
            host_data = yaml.safe_load(f)

        if not host_data:
            raise ValueError("Empty or invalid YAML format.")
        if "hostname" not in host_data or "ip_address" not in host_data:
            raise KeyError("Missing required fields: 'hostname' or 'ip_address'.")

        hostname = host_data["hostname"]
        ip = host_data["ip_address"]

        inventory["all"]["hosts"].append(ip)

        inventory["_meta"]["hostvars"][ip] = {
            "hostname": hostname,
            "tailscale_hostname": host_data.get("tailscale_hostname"),
            "roles": host_data.get("roles", []),
            "settings": host_data.get("settings", {}),
            "tags": host_data.get("tags", []),
            "notes": host_data.get("notes", ""),
            "source_file": file,
            "global": global_config,    # Merge in global vars
            "env": env_vars             # Merge in env vars
        }

    except Exception as e:
        print(f"[ERROR] Failed to process {file}: {e}", file=sys.stderr)
        sys.exit(1)

# --- Output ONLY JSON (for Ansible) ---
print(json.dumps(inventory, indent=2))

# # Print to stdout (For debugging only)
# print("\n[DEBUG] Final Parsed Dynamic Inventory:", file=sys.stderr)
# print(inventory_json)