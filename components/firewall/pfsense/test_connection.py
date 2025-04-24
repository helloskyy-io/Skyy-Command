# test_connection.py

import sys
from pathlib import Path

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parents[3]))

from components.firewall.pfsense.api.client import get

def test_api_connection():
    try:
        data = get("/system/version")
        print("[✅] Connected to pfSense API.")
        print(f"Product Version: {data.get('data', {}).get('version')}")
        print(f"Base Version: {data.get('data', {}).get('base')}")
        print(f"Build Time: {data.get('data', {}).get('buildtime')}")

    except Exception as e:
        print("[❌] Failed to connect or authenticate with pfSense API.")
        print(e)

if __name__ == "__main__":
    test_api_connection()
