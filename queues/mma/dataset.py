import numpy as np
from mma.simulation import simulate_mma
from logs import get_logger

logger = get_logger("mma_dataset")

def generate_dataset(n_samples=2000):
    """Generate dataset of (λ, μ, a, log_avg_wait)."""

    data = []
    customers = 5000
    logger.debug(f"Generating {n_samples} samples for M/M/a")

    for _ in range(n_samples):
        # λ near μ → interesting region
        λ = np.random.uniform(0.1, 0.9)
        delta = np.random.beta(2, 5) * (1 - λ)
        μ = λ + delta
        
        # choose number of servers (you can change this)
        a = np.random.randint(1, 8)  # servers = 1 to 7

        avg_wait = simulate_mma(λ, μ, a, customers)

        data.append((λ, μ, a, np.log(avg_wait + 1e-8)))

    return np.array(data)
