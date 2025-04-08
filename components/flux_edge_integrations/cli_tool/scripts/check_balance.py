# components/flux_edge_integrations/cli_tool/scripts/check_balance.py

import sys
import os
import json
import re

# Add the utils/ directory to PYTHONPATH
current_dir = os.path.dirname(os.path.abspath(__file__))
utils_path = os.path.abspath(os.path.join(current_dir, '..', 'utils'))
sys.path.append(utils_path)

from runner import run_fluxedge_cli


def main():
    result = run_fluxedge_cli(["balance", "--output", "json"])

    if not result:
        print(json.dumps({
            "status": "error",
            "message": "No output received from CLI."
        }))
        return

    # Extract JSON from CLI output
    match = re.search(r'{.*}', result, re.DOTALL)
    if not match:
        print(json.dumps({
            "status": "error",
            "message": "No JSON found in CLI output.",
            "raw": result
        }))
        return

    try:
        data = json.loads(match.group(0))
        print(json.dumps({
            "status": "success",
            "balance_usd": data.get("balance"),
            "spending_per_hour": data.get("spending_per_hour"),
            "time_left_hours": data.get("time_left")
        }))
    except json.JSONDecodeError as e:
        print(json.dumps({
            "status": "error",
            "message": "Failed to parse JSON output.",
            "details": str(e),
            "raw": result
        }))


if __name__ == "__main__":
    main()
