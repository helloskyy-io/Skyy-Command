# components/flux_edge_integrations/cli_tool/utils/runner.py

import os
import subprocess
from dotenv import load_dotenv

# Load environment from .env at repo root
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', '.env'))

FLUXCLI_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', 'bin', 'fluxedge-cli')
)

API_KEY = os.getenv("FLUXEDGE_API_KEY")
ENDPOINT = os.getenv("FLUXEDGE_API_ENDPOINT")

def run_fluxedge_cli(args: list, debug: bool = False) -> str | None:
    if not API_KEY or not ENDPOINT:
        return None

    full_cmd = [
        FLUXCLI_PATH
    ] + args + [
        "--api-key", API_KEY,
        "--endpoint", ENDPOINT
    ]

    if debug:
        print("[DEBUG] CLI Path        :", FLUXCLI_PATH)
        print("[DEBUG] API Key         :", API_KEY[:8] + "...")
        print("[DEBUG] Endpoint        :", ENDPOINT)
        print("[DEBUG] Command (args)  :", full_cmd)

    try:
        result = subprocess.run(
            full_cmd,
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        return e.stdout or e.stderr or None
