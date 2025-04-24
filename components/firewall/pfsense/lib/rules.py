# components/firewall/pfsense/lib/rules.py

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

def create_dmz_rule(internal_ip: str) -> tuple[bool, dict]:
    payload = {
        "type": "pass",
        "interface": ["wan"],
        "ipprotocol": "inet",
        "protocol": "tcp/udp",
        "source": "any",
        "destination": internal_ip,
        "descr": f"DMZ: Allow all to {internal_ip}",
        "disabled": False,
        "log": False,
        "statetype": "keep state",
        "direction": "any",
        "quick": True,
        "floating": False
    }

    url = f"{BASE_URL}/firewall/rule"
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

def list_dmz_rules() -> list[str]:
    url = f"{BASE_URL}/firewall/rules"
    try:
        response = requests.get(url, headers=HEADERS, verify=False)
        response.raise_for_status()
        data = response.json()
        # Return internal IPs that have DMZ-style rules (best-effort filter)
        return [r["destination"] for r in data.get("data", []) if r.get("descr", "").startswith("DMZ: ")]
    except requests.RequestException as e:
        print("[❌] Failed to fetch firewall rules:", e)
        return []

def create_many_dmz_rules(internal_ips: list[str]) -> None:
    for ip in internal_ips:
        success, result = create_dmz_rule(ip)
        if success:
            print(f"[✅] Created DMZ rule for {ip}")
        else:
            print(f"[❌] Failed to create DMZ rule for {ip}: {result.get('error')}")

if __name__ == "__main__":
    test_internal_ips = [
        "69.1.1.42",
        "69.1.1.43"
    ]
    create_many_dmz_rules(test_internal_ips)
