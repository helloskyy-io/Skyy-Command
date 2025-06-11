import random
import pynvml

class GPUInterface:
    def __init__(self):
        pynvml.nvmlInit()
        self.count = pynvml.nvmlDeviceGetCount()
        self.temp = {}
        self.fan = {}
        self.pl = {}
        self.direction = {}

        for i in range(self.count):
            self.temp[i] = 70
            self.fan[i] = 50
            self.pl[i] = 80
            self.direction[i] = -1

    def get_temp(self, gpu_id):
        current = self.temp[gpu_id]

        # Reverse direction if at bounds
        if current <= 45:
            self.direction[gpu_id] = 1
        elif current >= 70:
            self.direction[gpu_id] = -1

        self.temp[gpu_id] += self.direction[gpu_id]
        return self.temp[gpu_id]

    def get_fan_speed(self, gpu_id):
        return self.fan[gpu_id]

    def set_fan_speed(self, gpu_id, speed):
        self.fan[gpu_id] = speed

    def get_power_limit(self, gpu_id):
        return self.pl[gpu_id]

    def set_power_limit(self, gpu_id, pct):
        self.pl[gpu_id] = pct

    def shutdown_gpu(self, gpu_id):
        print(f"[gpu-agent] SHUTDOWN: GPU {gpu_id} marked offline")
