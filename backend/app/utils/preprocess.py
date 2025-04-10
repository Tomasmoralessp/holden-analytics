import pandas as pd

def preprocess_dataset(df: pd.DataFrame):
    """
    Prepara los datos para predicción.
    - Separa X e y.
    - Convierte valores booleanos a numéricos.
    - Aplica get_dummies si hay columnas categóricas.
    """
    df = df.copy()

    if "Churn" not in df.columns:
        raise ValueError("La columna 'Churn' no está en el dataset")

    y = df["Churn"]
    X = df.drop(columns=["Churn"])

    # Convertir booleanos a float (por compatibilidad con XGBoost)
    for col in X.select_dtypes(include=["bool"]).columns:
        X[col] = X[col].astype(float)

    # Aplicar one-hot encoding si hay columnas categóricas (opcionales)
    X = pd.get_dummies(X, drop_first=True)

    return X, y
