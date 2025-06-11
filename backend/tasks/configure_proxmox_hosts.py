#!/usr/bin/env python3

import sys
from pathlib import Path

# -------------------------------
# Establish project root for imports
# -------------------------------
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))  # Add /skyy-command to PYTHONPATH

# -------------------------------
# Standard + Internal Imports
# -------------------------------
import subprocess
from backend.utils.config_loader import load_config, load_env

# -------------------------------
# Constants
# -------------------------------
INVENTORY_SCRIPT = PROJECT_ROOT / "backend/inventory/inventory_hosts_local.py"
PLAYBOOK_PATH = PROJECT_ROOT / "ansible/playbooks/configure_hosts_local.yaml"

# -------------------------------
# Main Logic
# -------------------------------
def main():
    load_env()
    config = load_config()

    if not config.get("proxmox", {}).get("proxmox", False):
        print("ℹ️  Skipping playbook: proxmox.proxmox is not enabled in config.yaml")
        sys.exit(0)

    print("🚀 Proxmox flag detected — running configure_hosts_local.yaml...\n")
    result = subprocess.run([
        "ansible-playbook",
        "-i", str(INVENTORY_SCRIPT),
        str(PLAYBOOK_PATH)
    ])

    if result.returncode != 0:
        print(f"\n❌ Ansible playbook failed with exit code {result.returncode}")
        sys.exit(result.returncode)

    print("\n✅ Proxmox playbook ran successfully.")

# -------------------------------
if __name__ == "__main__":
    main()
