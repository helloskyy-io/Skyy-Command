import pynvml

def init_nvml():
    try:
        pynvml.nvmlInit()
    except pynvml.NVMLError as e:
        raise RuntimeError(f"Failed to initialize NVML: {e}")

def get_gpu_ids():
    try:
        count = pynvml.nvmlDeviceGetCount()
        if count == 0:
            raise RuntimeError("No NVIDIA GPUs detected on this system.")
        return list(range(count))
    except pynvml.NVMLError as e:
        raise RuntimeError(f"NVML error while detecting GPUs: {e}")
