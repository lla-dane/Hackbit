import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import torch
import torch.nn as nn
import torch.optim as optim

from mm1.dataset import generate_dataset   # (λ, μ, log(avg_wait))
from mm1.model import QueueNet             # takes 2 inputs: λ, μ
from logs import get_logger

logger = get_logger("mm1_ex")


def train_model(optimizer_cls,
                loss_fn_cls,
                X,
                y,
                epochs=4000,
                lr=0.01,
                evaluate_example=True):
    """
    Train QueueNet on a FIXED dataset (X, y) for a given optimizer and loss function.
    X: tensor of shape (N, 2)  -> (λ, μ)
    y: tensor of shape (N, 1)  -> log(avg_wait)
    """
    # ----- Model, optimizer, loss -----
    # Optional: set seed so every combo starts from same init (fair comparison)
    torch.manual_seed(0)
    model = QueueNet()
    logger.debug("Model initialized")

    optimizer = optimizer_cls(model.parameters(), lr=lr)
    loss_fn = loss_fn_cls()

    logger.info(
        f"Training for {epochs} epochs, lr={lr}, "
        f"optimizer={optimizer_cls}, loss={loss_fn_cls}"
    )

    # ----- Training loop -----
    for epoch in range(epochs):
        optimizer.zero_grad()
        pred = model(X)
        loss = loss_fn(pred, y)
        loss.backward()
        optimizer.step()

        if epoch % 200 == 0:
            logger.info(f"[EPOCH {epoch}] Loss: {loss.item():.6f}")

    final_loss = loss.item()
    logger.info(f"Final Loss: {final_loss:.6f}")

    # ----- Example prediction (optional) -----
    if evaluate_example:
        test_input = torch.tensor([[0.5, 0.8]], dtype=torch.float32)
        pred_log_wait = model(test_input).item()
        pred_wait = torch.exp(torch.tensor(pred_log_wait)).item()
        logger.info(f"Predicted Avg Wait (NN): {pred_wait:.6f}")

    return model, final_loss


def compare_losses_and_optimizers(X, y, epochs=2000, lr=0.01):
    """
    Train models with different optimizers and loss functions on the SAME dataset (X, y)
    and return a comparison of final losses.

    Returns:
        results: dict with keys (optimizer_name, loss_name) and values final_loss
    """
    optimizers = {
        "Adam":    optim.Adam,
        "SGD":     optim.SGD,
        "RMSprop": optim.RMSprop,
        "Adagrad": optim.Adagrad,
    }

    loss_functions = {
        "MSELoss":      nn.MSELoss,
        "L1Loss":       nn.L1Loss,
        "SmoothL1Loss": nn.SmoothL1Loss,  # Huber-like
    }

    results = {}

    for opt_name, opt_cls in optimizers.items():
        for loss_name, loss_cls in loss_functions.items():
            logger.info(
                f"========== Training with {opt_name} + {loss_name} =========="
            )
            # evaluate_example=False to avoid extra logs each time
            _, final_loss = train_model(
                optimizer_cls=opt_cls,
                loss_fn_cls=loss_cls,
                X=X,
                y=y,
                epochs=epochs,
                lr=lr,
                evaluate_example=False,
            )
            results[(opt_name, loss_name)] = final_loss

    logger.info("===== COMPARISON OF OPTIMIZERS & LOSS FUNCTIONS =====")
    for (opt_name, loss_name), final_loss in results.items():
        logger.info(f"{opt_name:8s} + {loss_name:12s} -> {final_loss:.6f}")

    return results


if __name__ == "__main__":
    logger.debug("Starting M/M/1 NN training script")

    # ----- Generate dataset ONCE -----
    data = generate_dataset()
    logger.debug(f"Dataset shape: {data.shape}")

    X = torch.tensor(data[:, :2], dtype=torch.float32)   # λ, μ
    y = torch.tensor(data[:, 2:], dtype=torch.float32)   # log(avg_wait)
    logger.debug(f"Features shape: {X.shape}, Targets shape: {y.shape}")

    # Example 1: Train once with a specific combo (Adam + MSELoss)
    model, final_loss = train_model(
        optimizer_cls=optim.Adam,
        loss_fn_cls=nn.MSELoss,
        X=X,
        y=y,
        epochs=4000,
        lr=0.01,
        evaluate_example=True,
    )

    # Example 2: Compare different optimizers & losses on the SAME dataset
    comparison = compare_losses_and_optimizers(X, y, epochs=2000, lr=0.01)

    print("\nComparison of final losses:")
    for (opt_name, loss_name), loss_val in comparison.items():
        print(f"{opt_name:8s} + {loss_name:12s} -> {loss_val:.6f}")