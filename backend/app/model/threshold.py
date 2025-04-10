import numpy as np
from sklearn.metrics import confusion_matrix, f1_score, recall_score, precision_score

def calculate_cost(y_true, y_pred, cost_fn=100, cost_fp=100):
  tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
  return (fp * cost_fp) + (fn * cost_fn)

def optimize_threshold_by_cost(y_true, y_probs, cost_fn=100, cost_fp=10):
    thresholds = np.arange(0.2, 0.81, 0.01)
    best = {"threshold": 0.5, "cost": float("inf"), "f1": 0.0, "recall": 0.0, "precision": 0.0}

    for t in thresholds:
        y_pred = (y_probs >= t).astype(int)
        cost = calculate_cost(y_true, y_pred, cost_fn, cost_fp)
        f1 = f1_score(y_true, y_pred)
        recall = recall_score(y_true, y_pred)
        precision = precision_score(y_true, y_pred)

        if cost < best["cost"]:
            best = {
                "threshold": t,
                "cost": cost,
                "f1": f1,
                "recall": recall,
                "precision": precision
            }

    return best["threshold"], best["cost"], best["f1"], best["recall"], best["precision"]