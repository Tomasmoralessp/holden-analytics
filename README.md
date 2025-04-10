# Holden Analytics 🧠📊

**Holden Analytics** es una herramienta inteligente para empresas de telecomunicaciones que predice el riesgo de pérdida de clientes (*churn*) y ofrece explicaciones claras y recomendaciones accionables para retenerlos.

Este MVP (Minimum Viable Product) está desarrollado con **FastAPI** (backend) y **React SPA** (frontend), y utiliza un modelo **XGBoost** entrenado y optimizado para predecir con precisión el churn, considerando los costes reales de error definidos por el negocio.

---

## 🚀 Funcionalidades incluidas en el MVP

- ✅ Subida de CSV de clientes.
- ✅ Preprocesamiento de datos y predicción de churn.
- ✅ Optimización del threshold según coste económico (`cost_fn`, `cost_fp`).
- ✅ Ranking de clientes con mayor riesgo.
- ✅ Explicabilidad global del modelo con SHAP.
- ✅ Recomendaciones simples por reglas.
- ✅ Visualización básica de resultados en React SPA.

---

## 🛠️ Cómo ejecutar el backend (FastAPI)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Tomasmoralessp/holden-analytics.git
cd holden-analytics/backend
```

### 2. Crear y activar entorno virtual

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
# .\venv\Scripts\Activate.ps1   ← PowerShell en Windows
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Ejecutar la API

```bash
uvicorn app.main:app --reload
```

Accede a la documentación interactiva:
[http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📁 Estructura del proyecto

```
backend/
│
├── app/
│   ├── main.py              # Arranque de FastAPI
│   ├── api/predict.py       # Endpoint de predicción
│   ├── model/               # Modelo, threshold, SHAP
│   ├── utils/preprocess.py  # Limpieza y preparación
│   └── schemas/             # (Opcional) Esquemas de entrada/salida
├── requirements.txt
```

---

## 🧠 Visión a futuro

Consulta las fases de desarrollo en [`docs/iterations_summary.md`](docs/iterations_summary.md)

---

## 📄 Licencia

MIT © [Tomás Morales](https://github.com/Tomasmoralessp)