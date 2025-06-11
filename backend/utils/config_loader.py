from pathlib import Path
import yaml
from dotenv import load_dotenv
import os

# Define base directory (root of repo)
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Define config and env paths
CONFIG_PATH = BASE_DIR / "config.yaml"
ENV_PATH = BASE_DIR / ".env"

def load_config():
    if not CONFIG_PATH.exists():
        raise FileNotFoundError(f"config.yaml not found at {CONFIG_PATH}")
    with open(CONFIG_PATH, "r") as f:
        return yaml.safe_load(f)

def load_env():
    if not ENV_PATH.exists():
        raise FileNotFoundError(f".env file not found at {ENV_PATH}")
    load_dotenv(dotenv_path=ENV_PATH)
    return dict(os.environ)
