# components/firewall/pfsense/lib/nats.py

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

def list_nats() -> list[str]:
    url = f"{BASE_URL}/firewall/nat/one_to_one/mappings"
    try:
        response = requests.get(url, headers=HEADERS, verify=False)
        response.raise_for_status()
        data = response.json()
        return [entry["external"] for entry in data.get("data", [])]
    except requests.RequestException as e:
        print("[❌] Failed to fetch NATs:", e)
        return []

def create(public_ip: str, internal_ip: str) -> tuple[bool, dict]:
    payload = {
        "interface": "wan",
        "external": public_ip,
        "source": "any",
        "destination": internal_ip,
        "natreflection": None,
        "nobinat": False,
        "disabled": False,
        "ipprotocol": "inet"
    }

    url = f"{BASE_URL}/firewall/nat/one_to_one/mapping"
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
    # Placeholder for delete logic: will need to list all NATs, find match, then delete by ID
    return False, {"error": "delete() not implemented yet"}

def create_many(nat_map: list[dict]) -> None:
    for entry in nat_map:
        public_ip = entry.get("public_ip")
        internal_ip = entry.get("internal_ip")
        if not public_ip or not internal_ip:
            print(f"[⚠️] Skipping invalid NAT mapping: {entry}")
            continue

        success, result = create(public_ip, internal_ip)
        if success:
            print(f"[✅] Created NAT {public_ip} → {internal_ip}")
        else:
            print(f"[❌] Failed to create NAT {public_ip}: {result.get('error')}")

if __name__ == "__main__":
    test_nats = [
        {"public_ip": "38.247.82.42", "internal_ip": "69.1.1.42"},
        {"public_ip": "38.247.82.43", "internal_ip": "69.1.1.43"}
    ]
    create_many(test_nats)


