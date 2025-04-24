import os
import requests
from dotenv import load_dotenv
from urllib3.exceptions import InsecureRequestWarning
import urllib3

load_dotenv()
urllib3.disable_warnings(InsecureRequestWarning)

API_KEY = os.getenv("PFSENSE_HARG_API_KEY")
BASE_URL = os.getenv("PFSENSE_HARG_API_BASE", "") + os.getenv("PFSENSE_HARG_API_V2", "")

HEADERS = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}

def list_static_mappings() -> list[str]:
    url = f"{BASE_URL}/services/dhcp_static_mappings"
    try:
        response = requests.get(url, headers=HEADERS, verify=False)
        response.raise_for_status()
        data = response.json()
        return [entry["mac"] for entry in data.get("data", []) if "mac" in entry]
    except requests.RequestException as e:
        print("[❌] Failed to fetch DHCP static mappings:", e)
        return []

def create(mac: str, ipaddr: str) -> tuple[bool, dict]:
    payload = {
        "parent_id": "opt3",  # Static override for LAN-HARGETT DHCP server
        "mac": mac,
        "ipaddr": ipaddr,
        "arp_table_static_entry": True,
        "descr": f"Auto-mapped {mac} -> {ipaddr}"
    }

    url = f"{BASE_URL}/services/dhcp_server/static_mapping"
    try:
        response = requests.post(url, headers=HEADERS, json=payload, verify=False)
        response.raise_for_status()
        return True, response.json()
    except requests.RequestException as e:
        if e.response is not None:
            try:
                error_detail = e.response.json()
            except Exception:
                error_detail = e.response.text
        else:
            error_detail = str(e)
        return False, {"error": error_detail}

def delete(mac: str) -> tuple[bool, dict]:
    return False, {"error": "delete() not implemented yet"}

def create_many(reservations: list[dict]) -> None:
    for entry in reservations:
        mac = entry.get("mac")
        ipaddr = entry.get("internal_ip")
        if not mac or not ipaddr:
            print(f"[⚠️] Skipping invalid DHCP reservation: {entry}")
            continue

        success, result = create(mac, ipaddr)
        if success:
            print(f"[✅] Created DHCP reservation {mac} → {ipaddr}")
        else:
            print(f"[❌] Failed to create DHCP reservation {mac}: {result.get('error')}")

if __name__ == "__main__":
    test_reservations = [
        {"mac": "02:00:e6:d9:a5:e3", "internal_ip": "69.1.1.46"},
        {"mac": "02:00:aa:2e:7b:11", "internal_ip": "69.1.1.47"}
    ]
    create_many(test_reservations)
