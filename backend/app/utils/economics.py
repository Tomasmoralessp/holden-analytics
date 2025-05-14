def compute_economic_impact(fn: int, fp: int, tp: int, cost_fn: float, cost_fp: float, customer_value: float = 300.0) -> dict:
    retained_revenue = tp * customer_value
    total_cost = fn * cost_fn + fp * cost_fp
    net_gain = retained_revenue - total_cost
    cost_per_customer = retained_revenue / tp if tp > 0 else 0.0
    loss_from_fn = fn * customer_value
    cost_from_fp = fp * cost_fp

    return {
        "retained_revenue": retained_revenue,
        "total_cost": total_cost,
        "net_gain": net_gain,
        "cost_per_customer": cost_per_customer,
        "loss_from_fn": loss_from_fn,
        "cost_from_fp": cost_from_fp
    }