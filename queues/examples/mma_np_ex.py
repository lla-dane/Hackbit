# examples/mma_np.py
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import torch
from torch import nn, optim
from mma_np.dataset import generate_dataset
from mma_np.model import MMANPModel
from logs import get_logger

logger = get_logger("mma_np_example")

def main():
    logger.debug("Generating dataset for M/M/a with N-policy...")
    X, y = generate_dataset(samples=2000)
    
    X = torch.tensor(X, dtype=torch.float32)
    y = torch.tensor(y, dtype=torch.float32)
    
    model = MMANPModel()
    optimizer = optim.Adam(model.parameters(), lr=1e-3)
    loss_fn = nn.MSELoss()
    
    for epoch in range(500):
        optimizer.zero_grad()
        pred = model(X)
        loss = loss_fn(pred, torch.log1p(y))  # train on log-space to stabilize
        loss.backward()
        optimizer.step()
        
        if epoch % 50 == 0:
            logger.debug(f"Epoch {epoch} | Loss: {loss.item():.6f}")
    
    # Test prediction
    test_input = torch.tensor([[2.0, 3.0, 2, 5]], dtype=torch.float32)
    pred_wait = torch.expm1(model(test_input)).item()
    logger.info(f"Predicted avg wait: {pred_wait:.4f}")

if __name__ == "__main__":
    main()
