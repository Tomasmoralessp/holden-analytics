from fastapi import APIRouter, UploadFile, File
import pandas as pd

from app.utils.preprocess import preprocess_dataset
from app.model.training import predict_with_model
from app.model.threshold import optimize_threshold_by_cost
from app.model.explain import get_shap_summary
from app.model.metrics import get_classification_report, format_classification_report
from app.schemas.report import PredictionResponse, RiskScore, ShapFeature, ClassMetrics
from app.utils.economics import compute_economic_impact
from app.utils.llm_client import ask_openrouter, build_prompt

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict(
    file: UploadFile = File(...),
    cost_fn: int = 100,
    cost_fp: int = 10,
    preprocessed: bool = False
):
    df = pd.read_csv(file.file)

    if preprocessed:
        X = df.drop(columns=["Churn"])
        y_true = df["Churn"] if "Churn" in df.columns else None
    else:
        X, y_true = preprocess_dataset(df)

    model, probs = predict_with_model(X)
    threshold, cost, f1, recall, precision = optimize_threshold_by_cost(
        y_true, probs, cost_fn, cost_fp
    )

    y_pred = (probs >= threshold).astype(int)

    # Cálculo de métricas reales
    fn = int(((y_true == 1) & (y_pred == 0)).sum())
    fp = int(((y_true == 0) & (y_pred == 1)).sum())
    tp = int(((y_true == 1) & (y_pred == 1)).sum())
    tn = int(((y_true == 0) & (y_pred == 0)).sum())

    impact = compute_economic_impact(
        fn=fn,
        fp=fp,
        tp=tp,
        cost_fn=cost_fn,
        cost_fp=cost_fp
    )

    # ----------- IA: Generación de resumen y recomendación -----------

    prompt = build_prompt({
        "threshold": threshold,
        "recall": recall,
        "precision": precision,
        "net_gain": impact["net_gain"],
        "total_cost": impact["total_cost"],
        "tp": tp,
        "fn": fn
    })

    recommendation = ask_openrouter(prompt)

    shap_raw = get_shap_summary(model, X)
    shap_summary = [ShapFeature(**item) for item in shap_raw]

    top_risks_df = pd.DataFrame({
        "id": df.index,
        "risk_score": probs
    }).sort_values(by="risk_score", ascending=False).head(10)

    top_customers_at_risk = [
        RiskScore(id=int(row["id"]), risk_score=float(row["risk_score"]))
        for _, row in top_risks_df.iterrows()
    ]

    report_dict = get_classification_report(y_true, y_pred)
    formatted_report = format_classification_report(report_dict)

    return PredictionResponse(
        threshold=round(float(threshold), 2),
        coste_total=round(float(cost), 2),
        f1=round(float(f1), 3),
        recall=round(float(recall), 3),
        precision=round(float(precision), 3),
        fn=fn,
        fp=fp,
        tp=tp,
        tn=tn,
        shap_summary=shap_summary,
        top_customers_at_risk=top_customers_at_risk,
        classification_report=formatted_report,
        recommendation=recommendation,
        **impact
)

