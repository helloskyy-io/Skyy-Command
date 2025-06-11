from agent.config import GPUConfig

def calculate_fan_speed(temp: int, gpu_cfg: GPUConfig, current_speed: int) -> int:
    t = gpu_cfg.fan_control
    target_temp = (t.min_temp + t.max_temp) / 2
    error = temp - target_temp  # positive = too hot

    raw_adjustment = t.gain * error
    bounded_adjustment = max(-t.max_step, min(t.max_step, round(raw_adjustment)))

    new_speed = current_speed + bounded_adjustment
    return max(t.min_speed, min(t.max_speed, new_speed))


def calculate_power_limit(temp: int, gpu_cfg: GPUConfig, current_pl: int) -> int:
    p = gpu_cfg.power_control
    target_temp = (p.min_temp + p.max_temp) / 2
    error = target_temp - temp  # positive = too cool

    raw_adjustment = p.gain * error
    bounded_adjustment = max(-p.max_step, min(p.max_step, round(raw_adjustment)))

    new_pl = current_pl + bounded_adjustment
    return max(p.min_pl, min(p.max_pl, new_pl))


