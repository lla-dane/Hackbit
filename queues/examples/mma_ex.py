import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import torch
import torch.optim as optim
import torch.nn as nn

from mma.dataset import generate_dataset
from mma.model import QueueNet
from logs import get_logger

logger = get_logger("mma_ex")

def train_model(epochs=4000, lr=0.01):
    data = generate_dataset()
    logger.debug(f"Dataset shape: {data.shape}")

    X = torch.tensor(data[:, :3], dtype=torch.float32)   # λ, μ, a
    y = torch.tensor(data[:, 3:], dtype=torch.float32)   # log(avg_wait)

    model = QueueNet()
    logger.debug("Model initialized")

    optimizer = optim.Adam(model.parameters(), lr=lr)
    loss_fn = nn.MSELoss()

    logger.info(f"Training for {epochs} epochs, lr={lr}")

    for epoch in range(epochs):
        optimizer.zero_grad()
        pred = model(X)
        loss = loss_fn(pred, y)
        loss.backward()
        optimizer.step()

        if epoch % 200 == 0:
            logger.info(f"[EPOCH {epoch}] Loss: {loss.item():.5f}")

    return model


def test_model(model):
    logger.debug("Testing model")

    # Example: λ=0.5, μ=0.8, a=3
    test_input = torch.tensor([[0.5, 0.8, 3.0]], dtype=torch.float32)
    pred_wait = torch.exp(model(test_input)).item()

    logger.info(f"Predicted Avg Wait (NN): {pred_wait:.5f}")

    # no closed-form for Wq easily unless using Erlang C
    # so we just run a simulation to compare
    from mma.simulation import simulate_mma
    true_wait = simulate_mma(0.5, 0.8, 3)
    logger.info(f"Simulated Avg Wait: {true_wait:.5f}")


if __name__ == "__main__":
    model = train_model()
    test_model(model)
