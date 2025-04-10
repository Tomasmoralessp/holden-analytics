# Iteraciones de Desarrollo - Holden Analytics

---

## ✅ MVP (Versión inicial funcional y contextualizada)

### 🔹 Backend (FastAPI)
- Subida de archivo `.csv`.
- Preprocesamiento básico (dummies, conversión a `float`).
- Modelo XGBoost entrenado con `scale_pos_weight`.
- Optimización automática del threshold según **coste económico** definido por el cliente:
  - `cost_fn` = coste por perder un cliente.
  - `cost_fp` = coste por contactar a uno que no se iba.
- Predicción y ranking de clientes en riesgo.
- Cálculo de métricas: Recall, F1, Precisión.
- SHAP global: explicación general de importancia de variables.
- Recomendaciones simples por reglas (ej. contrato mensual, alta factura).

### 🔹 Frontend (React SPA)
- Componente para subir CSV.
- Mostrar:
  - % de clientes en riesgo.
  - Clientes ordenados por riesgo.
  - Recomendaciones básicas.
  - Visualización simplificada de importancia de variables.

---

## 🔁 Iteración 1 – Claridad, explicabilidad y segmentación

### 🔹 Mejoras clave
- Visualización de **curva ROC**, **F1 vs. threshold**.
- Mostrar **explicación SHAP por cliente** (por qué está en riesgo).
- Segmentación por patrones comunes (reglas tipo “clientes con contrato mensual y alta factura”).
- Mejora del frontend:
  - Tabla ordenable por riesgo.
  - Explicación expandible por cliente.
  - Filtros por grupo o tipo de recomendación.

---

## 🧠 Iteración 2 – Comparación, selección automática y clusters

### 🔹 Mejoras clave
- Entrenamiento y evaluación de múltiples modelos:
  - XGBoost, Random Forest, Logistic Regression.
- Comparación por F1, recall, coste total.
- Selección automática del mejor modelo según preferencias del cliente (modelo MCP).
- SHAP comparativo entre modelos.
- Clustering automático (KMeans o DBSCAN) para agrupar perfiles de clientes.
- Visualización de segmentos + características dominantes.

---

## 🚀 Iteración 3 – Inteligencia, personalización y escalabilidad

### 🔹 Mejoras clave
- **Preprocesamiento inteligente asistido por IA**:
  - Detección automática de columnas categóricas, nulos, outliers, etc.
  - Limpieza y transformación guiada o automática.
- Interpretación de **lenguaje natural** para definir contexto:
  > “Quiero evitar perder clientes aunque contacte a más de la cuenta.”
- AutoML simplificado:
  - Entrenamiento, tuning y evaluación completa según contexto.
- Recomendaciones dinámicas y personalizadas por perfil.
- Generación automática de reportes ejecutivos (PDF o JSON).
- Dashboard dinámico con visualizaciones inteligentes y filtros adaptativos.