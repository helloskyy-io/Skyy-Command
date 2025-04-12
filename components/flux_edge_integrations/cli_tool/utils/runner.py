# components/flux_edge_integrations/cli_tool/utils/runner.py

import os
import subprocess
import json
from dotenv import load_dotenv

# Load environment from .env at repo root
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', '.env'))

FLUXCLI_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', 'bin', 'fluxedge-cli')
)

API_KEY = os.getenv("FLUXEDGE_API_KEY")
ENDPOINT = os.getenv("FLUXEDGE_API_ENDPOINT")

def run_fluxedge_cli(command: list, debug: bool = False) -> dict | None:
    if not API_KEY or not ENDPOINT:
        print("[ERROR] Missing API key or endpoint.")
        return None

    # Inject output format, API key, and endpoint
    full_cmd = [
        FLUXCLI_PATH
    ] + command + [
        "-o", "json",
        "--api-key", API_KEY,
        "--endpoint", ENDPOINT
    ]

    if debug:
        print("[DEBUG] CLI Path        :", FLUXCLI_PATH)
        print("[DEBUG] API Key         :", API_KEY[:8] + "...")
        print("[DEBUG] Endpoint        :", ENDPOINT)
        print("[DEBUG] Full Command    :", " ".join(full_cmd))

    try:
        result = subprocess.run(
            full_cmd,
            capture_output=True,
            text=True,
            check=True
        )
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        print("[ERROR] CLI call failed:", e.stderr or e.stdout)
        return None
    except json.JSONDecodeError as e:
        print("[ERROR] Failed to parse JSON output:", e)
        return None
