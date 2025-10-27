import numpy as np
from mm1.simulation import simulate_mm1
from logs import get_logger

logger = get_logger("mm1_dataset")

def generate_dataset(n_samples=2000):
    """Generate dataset of (λ, μ, avg_wait) samples."""
    logger.debug(f"Generating {n_samples} samples")
    data = []
    customers = 15000
    logger.debug(f"Starting the simulation with {customers} customers")
    for _ in range(n_samples):
      # Bias λ close to μ for harder regions
        λ = np.random.uniform(0.1, 0.9)
        delta = np.random.beta(2, 5) * (1 - λ)  # beta skews towards small differences
        μ = λ + delta

        avg_wait = simulate_mm1(λ, μ, customers)  # more samples → less noise

        # Log-transform the waiting time target
        data.append((λ, μ, np.log(avg_wait + 1e-8)))  # small epsilon for safety
    return np.array(data)
