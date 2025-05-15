# app/utils/llm_formatter.py

def prepare_llm_payload(
    impact: dict,
    threshold: float,
    precision: float,
    recall: float,
    f1: float,
    tp: int,
    fp: int,
    fn: int,
    tn: int,
    shap_summary: list,
    top_customers_df
) -> dict:
    return {
        "economic_summary": impact,
        "model_metrics": {
            "threshold": threshold,
            "precision": precision,
            "recall": recall,
            "f1": f1,
            "tp": tp,
            "fp": fp,
            "fn": fn,
            "tn": tn
        },
        "shap_summary": [s.model_dump() for s in shap_summary],
        "top_customers": top_customers_df.to_dict(orient="records")
    }
