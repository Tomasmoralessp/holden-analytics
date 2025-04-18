# Holden Analytics

Holden Analytics es una herramienta orientada a empresas de telecomunicaciones para predecir el riesgo de cancelación de clientes (churn) y estimar el impacto económico de distintas estrategias de retención.

Este MVP se centra exclusivamente en el backend desarrollado con FastAPI, e implementa la lógica predictiva, analítica y económica sobre un modelo de clasificación entrenado previamente (XGBoost). En futuras iteraciones, se contempla la integración de un frontend interactivo y un sistema completo tipo SaaS.

## Funcionalidades implementadas en el MVP

- Subida de archivos CSV con predicciones o datos sin procesar.
- Cálculo de métricas de rendimiento (f1, recall, precision, matriz de confusión).
- Optimización automática del umbral según los costes definidos por el usuario (cost_fn, cost_fp).
- Estimación del coste económico total asociado a cada configuración.
- Generación de un ranking de clientes con mayor riesgo de cancelación.
- Explicabilidad global del modelo mediante SHAP.
- Documentación interactiva con Swagger para probar la API sin necesidad de código.

## Cómo ejecutar el backend (FastAPI)

### 1. Clonar el repositorio

```
git clone https://github.com/Tomasmoralessp/holden-analytics.git
cd holden-analytics/backend
```

### 2. Crear y activar entorno virtual

```
python -m venv venv
source venv/bin/activate      # Linux/macOS
# .\venv\Scripts\Activate.ps1  # PowerShell en Windows
```

### 3. Instalar dependencias

```
pip install -r requirements.txt
```

### 4. Ejecutar la API

```
uvicorn app.main:app --reload
```

La documentación estará disponible en:
http://localhost:8000/docs

## Estructura del proyecto

```
backend/
│
├── app/
│   ├── main.py              # Arranque de FastAPI
│   ├── api/predict.py       # Endpoint de predicción
│   ├── model/               # Lógica de predicción, threshold y SHAP
│   ├── utils/preprocess.py  # Preprocesamiento y validación de CSV
│   └── schemas/             # Esquemas de entrada y salida
├── requirements.txt
```

## Próximas funcionalidades previstas

En base a la arquitectura ya desarrollada, se planea continuar el desarrollo del sistema con:

- Integración frontend (SPA con React) para una experiencia completa del usuario final.
- Visualización gráfica de métricas, clientes en riesgo y factores explicativos.
- Recomendaciones automáticas generadas a partir de reglas de negocio.
- Persistencia de análisis y sesiones para comparar resultados entre periodos.
- Soporte Docker para despliegue multiplataforma.
- Entrenamiento continuo del modelo con datos reales aportados por usuarios o empresas colaboradoras.
