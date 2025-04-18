# Iteraciones de Desarrollo - Holden Analytics

---

## ✅ MVP Actual – Estado funcional validado

### Backend (FastAPI)
- Subida de archivo `.csv` con datos preprocesados o sin procesar.
- Preprocesamiento (dummy encoding, transformación de tipos).
- Modelo XGBoost entrenado y ajustado.
- Optimización automática del threshold según **coste económico** definido por el usuario:
  - `cost_fn`: coste de un falso negativo (cliente perdido).
  - `cost_fp`: coste de un falso positivo (intervención innecesaria).
- Cálculo de métricas: Precision, Recall, F1, matriz de confusión.
- Estimación del coste económico total.
- Ranking de clientes con mayor riesgo.
- Interpretabilidad global del modelo con SHAP.
- Interfaz Swagger para probar y ajustar parámetros.

---

## 🔁 Iteración 1 – Visualización y explicabilidad individual

### Objetivos
- Visualización de curvas ROC y F1 vs. threshold.
- SHAP por cliente: explicación personalizada de riesgo.
- Segmentación por patrones comunes (reglas simples por grupo).
- Frontend inicial:
  - Tabla ordenable por nivel de riesgo.
  - Filtros por grupo, tipo de contrato o perfil.
  - Visualización de variables explicativas.

---

## 🧠 Iteración 2 – Comparación de modelos y clustering

### Objetivos
- Entrenamiento y evaluación de múltiples modelos:
  - XGBoost, Random Forest, Logistic Regression.
- Comparación por métricas y coste total.
- Selección automática del mejor modelo (sistema MCP).
- SHAP comparativo entre modelos.
- Clustering (KMeans, DBSCAN) para segmentar perfiles.
- Visualización de segmentos dominantes por grupo.

---

## 🚀 Iteración 3 – Automatización e inteligencia asistida

### Objetivos
- Preprocesamiento inteligente:
  - Identificación automática de columnas categóricas, nulos, outliers.
- Input en lenguaje natural para definir estrategia:
  > “Prefiero no perder clientes, aunque intervenga de más.”
- AutoML simplificado:
  - Entrenamiento, validación y selección completa según contexto.
- Recomendaciones personalizadas según perfil de cliente.
- Exportación de reportes ejecutivos en PDF/JSON.
- Dashboard interactivo con métricas, filtros y priorización de acciones.
