import time
from agent.config import AgentConfig, GPUConfig
from agent.gpu_controller import GPUInterface
from agent.runtime_helpers import calculate_fan_speed, calculate_power_limit

def start_runtime(config: AgentConfig, dry_run=False, once=False, debug=False):
    gpu = GPUInterface()
    log("[gpu-agent] Runtime started.")

    for gpu_cfg in config.gpus:
        temp = gpu.get_temp(gpu_cfg.id)
        fan_speed = gpu.get_fan_speed(gpu_cfg.id)
        power_limit = gpu.get_power_limit(gpu_cfg.id)

        log(f"[GPU {gpu_cfg.id}] Startup temp: {temp}°C")
        log(f"[GPU {gpu_cfg.id}] Current fan: {fan_speed}%")
        log(f"[GPU {gpu_cfg.id}] Current PL: {power_limit}%")

        if gpu_cfg.startup:
            if not dry_run:
                gpu.set_fan_speed(gpu_cfg.id, gpu_cfg.startup.init_fan_speed)
                gpu.set_power_limit(gpu_cfg.id, gpu_cfg.startup.init_power_limit_pct)
            log(f"[GPU {gpu_cfg.id}] Applied startup profile: Fan {gpu_cfg.startup.init_fan_speed}%, PL {gpu_cfg.startup.init_power_limit_pct}%")

    while True:
        for gpu_cfg in config.gpus:
            temp = gpu.get_temp(gpu_cfg.id)
            fan_speed = gpu.get_fan_speed(gpu_cfg.id)
            power_limit = gpu.get_power_limit(gpu_cfg.id)

            # FAN LOGIC
            desired_fan = calculate_fan_speed(temp, gpu_cfg, fan_speed)
            if desired_fan != fan_speed:
                if not dry_run:
                    gpu.set_fan_speed(gpu_cfg.id, desired_fan)
                log(f"[GPU {gpu_cfg.id}] Fan: {fan_speed}% → {desired_fan}% @ {temp}°C")
            elif debug:
                log(f"[GPU {gpu_cfg.id}] Fan steady at {fan_speed}% @ {temp}°C")

            # POWER LOGIC
            desired_pl = calculate_power_limit(temp, gpu_cfg, power_limit)
            if desired_pl != power_limit:
                if not dry_run:
                    gpu.set_power_limit(gpu_cfg.id, desired_pl)
                log(f"[GPU {gpu_cfg.id}] PL: {power_limit}% → {desired_pl}% @ {temp}°C")
            elif debug:
                log(f"[GPU {gpu_cfg.id}] PL steady at {power_limit}% @ {temp}°C")

        if once:
            break
        time.sleep(config.poll_interval_sec)

def log(msg):
    print(msg)
