# client.py

import os
import requests
from dotenv import load_dotenv
from pathlib import Path

# Disable SSL warnings for cert verification
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Force .env loading from project root
env_path = Path(__file__).resolve().parents[4] / ".env"
load_dotenv(dotenv_path=env_path)

API_KEY = os.getenv("PFSENSE_HARG_API_KEY")
BASE_URL = os.getenv("PFSENSE_HARG_API_ENDPOINT", "").rstrip("/")

HEADERS = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}


def get(endpoint):
    url = f"{BASE_URL}{endpoint}"
    return _handle_response(requests.get(url, headers=HEADERS, verify=False))


def post(endpoint, payload):
    url = f"{BASE_URL}{endpoint}"
    return _handle_response(requests.post(url, json=payload, headers=HEADERS, verify=False))


def put(endpoint, payload):
    url = f"{BASE_URL}{endpoint}"
    return _handle_response(requests.put(url, json=payload, headers=HEADERS, verify=False))


def patch(endpoint, payload):
    url = f"{BASE_URL}{endpoint}"
    return _handle_response(requests.patch(url, json=payload, headers=HEADERS, verify=False))


def delete(endpoint):
    url = f"{BASE_URL}{endpoint}"
    return _handle_response(requests.delete(url, headers=HEADERS, verify=False))


def _handle_response(response):
    try:
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        print(f"[❌] API Error {response.status_code}: {response.text}")
        raise e
