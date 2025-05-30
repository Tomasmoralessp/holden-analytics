from pydantic import BaseModel
from typing import List, Dict, Union

class RiskScore(BaseModel):
    id: int
    risk_score: float

class ShapFeature(BaseModel):
    feature: str
    importance: float
    direction: float

class ClassMetrics(BaseModel):
    precision: float
    recall: float
    f1_score: float
    support: int

class PredictionResponse(BaseModel):
    threshold: float
    coste_total: float
    f1: float
    recall: float
    precision: float
    fn: int
    fp: int
    tp: int
    tn: int
    shap_summary: List[ShapFeature]
    top_customers_at_risk: List[RiskScore]
    classification_report: Dict[str, Union[ClassMetrics, float]]
    retained_revenue: float
    total_cost: float
    net_gain: float
    cost_per_customer: float
    loss_from_fn: float
    cost_from_fp: float
    recommendation: str
