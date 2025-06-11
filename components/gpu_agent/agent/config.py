from pydantic import BaseModel, Field
from typing import List, Optional

class FanControlThresholds(BaseModel):
    min_temp: int = Field(ge=20, le=90)  # below = lower fan
    max_temp: int = Field(ge=20, le=100) # above = raise fan
    min_speed: int = Field(ge=0, le=100) # % duty cycle
    max_speed: int = Field(ge=0, le=100)
    gain: float = 1.0
    max_step: int = 5

class PowerControlThresholds(BaseModel):
    min_temp: int = Field(ge=20, le=100)
    max_temp: int = Field(ge=20, le=100)
    min_pl: int = Field(ge=50, le=100)  # % of full power
    max_pl: int = Field(ge=50, le=100)
    gain: float = 1.0
    max_step: int = 5

class StartupProfile(BaseModel):
    init_fan_speed: Optional[int] = Field(default=70, ge=30, le=100)
    init_power_limit_pct: Optional[int] = Field(default=70, ge=50, le=100)

class ProtectionMode(BaseModel):
    enable_auto_shutdown: bool = True
    shutdown_temp: int = Field(default=90, ge=80, le=100)
    max_fan_on_warning: bool = True
    min_power_on_warning: bool = True

class GPUConfig(BaseModel):
    id: int
    fan_control: FanControlThresholds
    power_control: PowerControlThresholds
    startup: Optional[StartupProfile] = StartupProfile()

class DefaultGPUConfig(BaseModel):
    fan_control: FanControlThresholds
    power_control: PowerControlThresholds
    startup: Optional[StartupProfile] = StartupProfile()

class AgentConfig(BaseModel):
    poll_interval_sec: int = 10
    protection: ProtectionMode = ProtectionMode()
    defaults: Optional[DefaultGPUConfig] = None
    gpus: List[GPUConfig] = Field(default_factory=list) 

def load_config(path: str) -> AgentConfig:
    import yaml
    with open(path, 'r') as f:
        data = yaml.safe_load(f)
    return AgentConfig(**data)
