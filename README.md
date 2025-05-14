# Holden Analytics

Holden Analytics es una herramienta orientada a empresas de telecomunicaciones para predecir el riesgo de cancelación de clientes (churn) y estimar el impacto económico de distintas estrategias de retención.

Este MVP incluye un backend desarrollado con FastAPI y un frontend React completamente funcional, ambos dockerizados para un despliegue rápido y reproducible. La lógica predictiva se basa en un modelo entrenado previamente (XGBoost) y permite la visualización de métricas clave, interpretabilidad mediante SHAP y análisis económico de estrategias de retención.

---

## Funcionalidades del MVP

* Subida de archivos CSV con predicciones o datos sin procesar
* Cálculo de métricas de rendimiento (f1, recall, precision, matriz de confusión)
* Optimización automática del umbral según costes definidos por el usuario (`cost_fn`, `cost_fp`)
* Estimación del coste económico total
* Ranking de clientes con mayor riesgo
* Visualización de importancia de variables (SHAP)
* Frontend completo con React + Vite
* API documentada con Swagger (`/docs`)

---

## Ejecución con Docker (recomendado)

### Requisitos

* Tener Docker y Docker Compose instalados (incluido por defecto con Docker Desktop en Windows/Mac)

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/Tomasmoralessp/holden-analytics.git
cd holden-analytics
```

2. Ejecutar el proyecto con Docker Compose:

```bash
docker compose up --build
```

3. Abrir en el navegador:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Documentación de la API (Swagger): [http://localhost:8000/docs](http://localhost:8000/docs)

Docker construirá automáticamente las imágenes del backend y del frontend, creará una red común entre servicios, y expondrá ambos puertos localmente.

---

## Ejecución manual del backend (sin Docker)

### 1. Entrar en carpeta backend

```bash
cd holden-analytics/backend
```

### 2. Crear y activar entorno virtual

```bash
python -m venv venv
# Linux/macOS
source venv/bin/activate
# Windows (PowerShell)
.\venv\Scripts\Activate.ps1
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Ejecutar API localmente

```bash
uvicorn app.main:app --reload
```

Documentación disponible en: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Estructura del proyecto

```
backend/
├── app/
│   ├── api/               # Endpoints de predicción
│   ├── main.py            # Lanzador principal FastAPI
│   ├── model/             # Modelo ML, lógica de predicción, SHAP
│   ├── schemas/           # Validaciones pydantic
│   └── utils/             # Preprocesamiento y validación CSV
├── requirements.txt
├── Dockerfile

frontend/
├── public/                # Archivos estáticos
├── src/
│   ├── components/
│   │   ├── analysis/      # Visualizaciones: métricas, SHAP, riesgo
│   │   └── layout/        # Navbar, footer
│   ├── pages/             # Vistas principales (Analysis, Home, etc.)
│   ├── App.tsx            # Enrutador principal
│   └── main.tsx          # Punto de entrada
├── .env                   # URL backend (VITE_API_URL)
├── package.json
├── Dockerfile
└── vite.config.ts
```

---

## Próximas funcionalidades

* Registro de sesiones y comparativa temporal
* Reglas de negocio personalizables para recomendaciones
* Entrenamiento incremental con datos reales
* Sistema multiusuario con persistencia
* Despliegue cloud con CI/CD
