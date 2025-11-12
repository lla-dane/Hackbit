# mma_np/dataset.py
import numpy as np
from .simulation import simulate_mma_np
from logs import get_logger

logger = get_logger("mma_np_dataset")

def generate_dataset(samples=2000):
    X = []
    y = []
    logger.debug(f"Generating {samples} samples")
    logger.debug("Taking default of 5000 customers")
    for _ in range(samples):
        lambda_rate = np.random.uniform(0.5, 4.0)
        mu_rate = np.random.uniform(lambda_rate + 0.1, lambda_rate + 4.0)
        # servers = np.random.randint(1, 5)
        servers = 1
        
        N = 3
        
        wait_time = simulate_mma_np(lambda_rate, mu_rate, servers, N)
        X.append([lambda_rate, mu_rate, servers, N])
        y.append(wait_time)
    
    return np.array(X, dtype=np.float32), np.array(y, dtype=np.float32).reshape(-1, 1)
