#!/usr/bin/env python3

import os
import sys
import json
import yaml
from pathlib import Path
from dotenv import load_dotenv

# -------------------------------
# Config paths
# -------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent.parent
CONFIG_PATH = BASE_DIR / "config.yaml"
ENV_PATH = BASE_DIR / ".env"
INVENTORY_PATH = BASE_DIR / "desired_state/hosts_local"

# -------------------------------
# Inline utility: Load .env
# -------------------------------
def load_env():
    if ENV_PATH.exists():
        load_dotenv(dotenv_path=ENV_PATH)
    else:
        print(f"[WARN] .env not found at {ENV_PATH} — continuing without it", file=sys.stderr)

# -------------------------------
# Inline utility: Load config.yaml
# -------------------------------
def load_config():
    if not CONFIG_PATH.exists():
        print(f"[ERROR] config.yaml not found at {CONFIG_PATH}", file=sys.stderr)
        sys.exit(1)
    with open(CONFIG_PATH, 'r') as f:
        return yaml.safe_load(f)

# -------------------------------
# Start
# -------------------------------
load_env()
CONFIG = load_config()
env_vars = dict(os.environ)

if not INVENTORY_PATH.exists():
    print(f"[ERROR] Inventory path '{INVENTORY_PATH}' does not exist.", file=sys.stderr)
    sys.exit(1)

host_files = [f for f in os.listdir(INVENTORY_PATH) if f.endswith((".yml", ".yaml"))]
if not host_files:
    print(f"[ERROR] No host config files found in '{INVENTORY_PATH}'.", file=sys.stderr)
    sys.exit(1)

# -------------------------------
# Build dynamic inventory
# -------------------------------
inventory = {
    "_meta": {"hostvars": {}},
    "all": {"hosts": []}
}

for file in host_files:
    filepath = INVENTORY_PATH / file
    try:
        with open(filepath, 'r') as f:
            host_data = yaml.safe_load(f)
        if not host_data:
            raise ValueError("Empty or invalid YAML.")
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
            "global": CONFIG,
            "env": env_vars
        }
    except Exception as e:
        print(f"[ERROR] Failed to process {file}: {e}", file=sys.stderr)
        sys.exit(1)

print(json.dumps(inventory, indent=2))
