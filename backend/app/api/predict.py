from fastapi import APIRouter, UploadFile, File
import pandas as pd

from app.utils.preprocess import preprocess_dataset
from app.model.training import predict_with_model
from app.model.threshold import optimize_threshold_by_cost
from app.model.explain import get_shap_summary
from app.model.metrics import get_classification_report, format_classification_report
from app.schemas.report import PredictionResponse

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
        # Asumimos que el CSV ya está listo para el modelo
        X = df.drop(columns=["Churn"])
        y_true = df["Churn"] if "Churn" in df.columns else None
    else:
        # Aplicamos limpieza y transformación
        X, y_true = preprocess_dataset(df)

    model, probs = predict_with_model(X)
    threshold, cost, f1, recall, precision = optimize_threshold_by_cost(y_true, probs, cost_fn, cost_fp)
    shap_summary = get_shap_summary(model, X)

    # Top clientes con mayor riesgo
    risk_scores = pd.DataFrame({
        "id": df.index,
        "risk_score": probs
    }).sort_values(by="risk_score", ascending=False).head(10).to_dict(orient="records")

    # Clasificación y métricas
    y_pred = (probs >= threshold).astype(int)
    report_dict = get_classification_report(y_true, y_pred)
    formatted_report = format_classification_report(report_dict)

    return PredictionResponse(
        threshold=round(float(threshold), 2),
        coste_total=round(float(cost), 2),
        f1=round(float(f1), 3),
        recall=round(float(recall), 3),
        precision=round(float(precision), 3),
        shap_summary=shap_summary,
        top_customers_at_risk=risk_scores,
        classification_report=formatted_report
    )
