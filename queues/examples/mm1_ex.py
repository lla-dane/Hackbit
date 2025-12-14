import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import torch
import torch.nn as nn
import torch.optim as optim

from mm1.dataset import generate_dataset
from mm1.model import QueueNet
from mm1.simulation import simulate_mm1
from logs import get_logger

logger = get_logger("mm1_compare")


# =============================
#  TRAINING FOR ONE COMBINATION
# =============================
def train_once(optimizer_cls, loss_fn_cls, X, y, epochs=2000, lr=0.01):
    """
    Train QueueNet using one optimizer + loss function on a fixed dataset (X, y).
    """
    # For fair comparison, fix init each time
    torch.manual_seed(0)
    model = QueueNet()

    optimizer = optimizer_cls(model.parameters(), lr=lr)
    loss_fn = loss_fn_cls()

    logger.info(f"Training using {optimizer_cls} + {loss_fn_cls}")

    for epoch in range(epochs):
        optimizer.zero_grad()
        pred = model(X)
        loss = loss_fn(pred, y)
        loss.backward()
        optimizer.step()

        if epoch % 200 == 0:
            logger.info(f"[EPOCH {epoch}] Loss = {loss.item():.6f}")

    return model, float(loss.item())


# =============================
#  COMPARE ALL LOSS + OPTIMIZER
# =============================
def compare_all(epochs=2000, lr=0.01):
    # ---- generate dataset ONCE ----
    data = generate_dataset()
    logger.debug(f"Dataset shape: {data.shape}")

    X = torch.tensor(data[:, :2], dtype=torch.float32)   # (λ, μ)
    y = torch.tensor(data[:, 2:], dtype=torch.float32)   # log(Wq)
    logger.debug(f"Features shape: {X.shape}, Targets shape: {y.shape}")

    optimizers = {
        "Adam":    optim.Adam,
        "SGD":     optim.SGD,
        "RMSprop": optim.RMSprop,
        "Adagrad": optim.Adagrad,
    }

    losses = {
        "MSELoss":      nn.MSELoss,
        "L1Loss":       nn.L1Loss,
        "SmoothL1Loss": nn.SmoothL1Loss,
    }

    results = {}

    for opt_name, opt_class in optimizers.items():
        for loss_name, loss_class in losses.items():
            logger.info(f"\n========== {opt_name} + {loss_name} ==========")
            model, final_loss = train_once(
                optimizer_cls=opt_class,
                loss_fn_cls=loss_class,
                X=X,
                y=y,
                epochs=epochs,
                lr=lr
            )
            results[(opt_name, loss_name)] = final_loss

    logger.info("\n===== FINAL LOSS COMPARISON =====")
    for (opt_name, loss_name), value in results.items():
        logger.info(f"{opt_name:8s} + {loss_name:12s} -> {value:.6f}")

    return results, X, y


# =============================
#    TEST SINGLE TRAINED MODEL
# =============================
def test_model(model):
    test_input = torch.tensor([[0.5, 0.8]], dtype=torch.float32)
    pred_wait = torch.exp(model(test_input)).item()
    
    mean = simulate_mm1(0.5, 0.8, 5000)
    logger.info("Via simulation: ", mean)

    # Theoretical M/M/1 waiting time in queue:
    lam, mu = 0.5, 0.8
    theoretical_wait = lam / (mu * (mu - lam))

    logger.info(f"Predicted Wq (NN)   = {pred_wait:.6f}")
    logger.info(f"Theoretical Wq      = {theoretical_wait:.6f}")


# =============================
#              MAIN
# =============================
if __name__ == "__main__":
    logger.info("Starting M/M/1 neural network training with shared dataset")

    # 1️⃣ Compare all optimizer + loss combinations on ONE dataset
    results, X, y = compare_all(epochs=2000, lr=0.01)

    print("\n=== COMPARISON TABLE ===")
    for (opt_name, loss_name), val in results.items():
        print(f"{opt_name:8s} + {loss_name:12s} -> {val:.6f}")

    # 2️⃣ Train final model with the best combination on the same dataset
    (best_opt_name, best_loss_name) = min(results, key=results.get)
    print(f"\nBest Combination: {best_opt_name} + {best_loss_name}")

    best_model, _ = train_once(
        optimizer_cls=getattr(optim, best_opt_name),
        loss_fn_cls=getattr(nn, best_loss_name),
        X=X,
        y=y,
        epochs=2000,
        lr=0.01
    )

    test_model(best_model)