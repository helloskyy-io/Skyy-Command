# components/flux_edge_integrations/cli_tool/scripts/check_balance.py

import sys
import os

# Add utils directory to PYTHONPATH
current_dir = os.path.dirname(os.path.abspath(__file__))
utils_path = os.path.abspath(os.path.join(current_dir, '..', 'utils'))
sys.path.append(utils_path)

from runner import run_fluxedge_cli

def main():
    result = run_fluxedge_cli(["balance"])

    if not result:
        print({
            "status": "error",
            "message": "FluxEdge CLI did not return valid output"
        })
        return

    print({
        "status": "success",
        "balance_usd": result.get("balance"),
        "spending_per_hour": result.get("spending_per_hour"),
        "time_left_hours": result.get("time_left")
    })


if __name__ == "__main__":
    main()
