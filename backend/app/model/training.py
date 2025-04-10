import joblib
import numpy as np
import os
from xgboost import XGBClassifier

MODEL_PATH = "app/model/xgb_model.joblib"

def load_model():
  if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Modelo no encontrado en {MODEL_PATH}")
  return joblib.load(MODEL_PATH)

def predict_with_model(X):
  """
  Carga el modelo XGBosst y predice las probabilidades sobre X.
  Retorna el modelo y las probabilidades.
  """
  model = load_model()
  probs = model.predict_proba(X)[:, 1]
  return model, probs