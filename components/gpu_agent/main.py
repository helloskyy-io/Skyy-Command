import os
import argparse
from agent.config import load_config, GPUConfig, DefaultGPUConfig
from agent.runtime import start_runtime
from agent.gpu_probe import init_nvml, get_gpu_ids

DEFAULT_CONFIG = "/etc/skyy/gpu_config.yaml"

def main():
    parser = argparse.ArgumentParser(description="GPU Agent")
    parser.add_argument("--config", default="/opt/skyy/desired_state/gpu/this_host.yaml")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--once", action="store_true")
    parser.add_argument("--debug", action="store_true")
    args = parser.parse_args()

    config = load_config(args.config)
    
    init_nvml()
    detected_ids = get_gpu_ids()

    if not config.gpus:
        detected_ids = get_gpu_ids()
        print(f"[gpu-agent] No GPUs defined in config, using defaults for detected GPUs: {detected_ids}")

        if not config.defaults:
            raise RuntimeError("No GPUs defined and no `defaults` block found in config.")

        defaults = config.defaults
        config.gpus = [
            GPUConfig(
                id=gpu_id,
                fan_control=defaults.fan_control,
                power_control=defaults.power_control,
                startup=defaults.startup
            ) for gpu_id in detected_ids
        ]

    start_runtime(config=config, dry_run=args.dry_run, once=args.once, debug=args.debug)

if __name__ == "__main__":
    main()
