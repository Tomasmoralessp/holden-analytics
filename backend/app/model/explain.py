import pandas as pd
import numpy as np
import shap

def get_shap_summary(model, X, top_n=10):
  """
  Calcula la importancia global de las variables usando SHAP.
  Retorna una lista con las top_n features más importatnes
  """

  # SHAP puede tardar si hay muchas filas, así que tomamos una muestra
  X_sample = X.sample(n=(min(500, len(X))), random_state=42)
  X_sample = X_sample.astype(float) 

  explainer = shap.Explainer(model, X_sample)
  shap_values = explainer(X_sample)

  # Promedio del impacto con signo
  signed_mean = shap_values.values.mean(axis=0)

  # Promedio absoluto (importancia)
  abs_mean = np.abs(shap_values.values).mean(axis=0)

  sumamry_df = pd.DataFrame({
    "feature": X.columns,
    "importance": abs_mean,
    "direction": signed_mean
  }).sort_values(by="importance", ascending=False)

  return sumamry_df.head(top_n).to_dict(orient="records")
