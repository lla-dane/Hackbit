import numpy as np

def simulate_mma(lambda_rate, mu_rate, num_servers, num_customers=10000):
    """Simulate an M/M/a queue and return average waiting time in queue."""
    
    arrival_times = np.cumsum(
        np.random.exponential(1 / lambda_rate, num_customers)
    )
    service_times = np.random.exponential(1 / mu_rate, num_customers)

    # Each server has its own finish time (initially all free at t = 0)
    server_finish_times = np.zeros(num_servers)

    waiting_times = np.zeros(num_customers)

    for i in range(num_customers):
        # Pick the server that becomes free the earliest
        s = np.argmin(server_finish_times)
        free_time = server_finish_times[s]

        # Service for this customer starts here
        start_service = max(arrival_times[i], free_time)
        finish_time = start_service + service_times[i]

        # Update that server's next free time
        server_finish_times[s] = finish_time

        # Waiting time = time before service actually begins
        waiting_times[i] = start_service - arrival_times[i]

    return np.mean(waiting_times)
