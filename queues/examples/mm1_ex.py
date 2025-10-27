import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import torch
import torch.optim as optim
import torch.nn as nn

from mm1.dataset import generate_dataset
from mm1.model import QueueNet
from logs import get_logger

logger = get_logger("mm1_ex")


def train_model(epochs=4000, lr=0.01):
    data = generate_dataset()
    logger.debug(f"Dataset shape:{data.shape}")

    X = torch.tensor(data[:, :2], dtype=torch.float32)  # λ and μ
    y = torch.tensor(data[:, 2:], dtype=torch.float32)  # log(avg_wait)
    logger.debug(f"Features shape: {X.shape}, Targets shape: {y.shape}")

    model = QueueNet()
    logger.debug("Model initialized")

    optimizer = optim.Adam(model.parameters(), lr=lr)
    loss_fn = nn.MSELoss()
    logger.info(f"Training started for {epochs} epochs with lr={lr}")

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
    logger.debug("Running test")
    test_input = torch.tensor([[0.5, 0.8]], dtype=torch.float32)
    pred_wait = torch.exp(model(test_input)).item()  # convert back from log-space
    theoretical_wait = (5 / 8) / (0.8 - 0.5)
    logger.info(f"Predicted Avg Wait (NN): {pred_wait:.3f}")
    logger.info(f"Theoretical Avg Wait: {theoretical_wait:.3f}")

if __name__ == "__main__":
    logger.debug("Starting M/M/1 NN training script")
    model = train_model()
    test_model(model)
