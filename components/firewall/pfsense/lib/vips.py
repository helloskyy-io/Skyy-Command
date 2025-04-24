# components/firewall/pfsense/lib/vips.py

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

def list_vips() -> list[str]:
    url = f"{BASE_URL}/firewall/virtual_ips"
    try:
        response = requests.get(url, headers=HEADERS, verify=False)
        response.raise_for_status()
        data = response.json()
        return [vip["subnet"] for vip in data.get("data", [])]
    except requests.RequestException as e:
        print("[❌] Failed to fetch VIPs:", e)
        return []

def create(public_ip: str) -> tuple[bool, dict]:
    payload = {
        "mode": "ipalias",
        "interface": "wan",
        "type": "single",
        "subnet": public_ip,
        "subnet_bits": 23
    }

    url = f"{BASE_URL}/firewall/virtual_ip"
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

def delete(public_ip: str) -> tuple[bool, dict]:
    # Placeholder for delete logic: will need to list all VIPs, find match, then delete by UUID or ID
    return False, {"error": "delete() not implemented yet"}

def create_many(ip_list: list[str]) -> None:
    for ip in ip_list:
        success, result = create(ip)
        if success:
            print(f"[✅] Created VIP {ip}")
        else:
            print(f"[❌] Failed to create VIP {ip}: {result.get('error')}")

if __name__ == "__main__":
    test_ips = [
        "38.247.82.42",
        "38.247.82.43",
        "38.247.82.44",
        "38.247.82.45"
    ]
    create_many(test_ips)
