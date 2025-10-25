import numpy as np
from logs import get_logger

logger = get_logger("mm1_simulation")

def simulate_mm1(lambda_rate, mu_rate, num_customers=10000):
    """Simulate M/M/! queue and return average waiting time."""    
    arrival_times = np.cumsum(np.random.exponential(1/lambda_rate, num_customers))
    service_times = np.random.exponential(1/mu_rate, num_customers)
    
    start_service_times = np.zeros(num_customers)
    finish_times = np.zeros(num_customers)
    waiting_times = np.zeros(num_customers)
    
    for i in range(1, num_customers):
        start_service_times[i] = max(arrival_times[i], finish_times[i-1])
        finish_times[i] = start_service_times[i] + service_times[i]
        waiting_times[i] = start_service_times[i] - arrival_times[i]
        
    return np.mean(waiting_times)

