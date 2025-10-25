# mma_np/simulation.py
import numpy as np

def simulate_mma_np(lambda_rate, mu_rate, servers, N, total_customers=5000):
    """
    Simulate an M/M/a queue with N-policy.
    Service starts when queue length >= N.
    """
    np.random.seed(42)
    inter_arrival_times = np.random.exponential(1 / lambda_rate, total_customers)
    arrival_times = np.cumsum(inter_arrival_times)
    
    service_times = np.random.exponential(1 / mu_rate, total_customers)
    server_free_times = np.zeros(servers)
    
    queue = []
    waiting_times = []
    active = False
    
    for i in range(total_customers):
        arrival_time = arrival_times[i]
        queue.append((arrival_time, service_times[i]))
        
        # Check activation condition
        if not active and len(queue) >= N:
            active = True
        
        if active:
            # Process available servers
            for s in range(servers):
                if len(queue) == 0:
                    break
                if server_free_times[s] <= arrival_time:
                    arr, serv = queue.pop(0)
                    start_time = max(arrival_time, server_free_times[s])
                    finish_time = start_time + serv
                    waiting_times.append(start_time - arr)
                    server_free_times[s] = finish_time
            
            # If queue empties, deactivate
            if len(queue) == 0:
                active = False
    
    return np.mean(waiting_times) if waiting_times else 0.0
