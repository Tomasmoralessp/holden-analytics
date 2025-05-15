import requests
import os
import json

api_key = os.getenv("OPENROUTER_API_KEY") or "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"


def ask_openrouter(prompt: str, model="mistralai/mistral-7b-instruct", api_key: str = api_key) -> str:
    if not api_key:
        raise ValueError("API key is required for OpenRouter")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a business analyst assistant."},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"].strip()

def build_prompt(metrics: dict) -> str:
    # Serializar todo como JSON indentado
    datos_json = json.dumps(metrics, indent=2)

    # Prompt completo
    return f"""
Actúa como un experto en retención de clientes en telecomunicaciones.

Con los datos que recibirás, genera una recomendación en el siguiente formato EXACTO (no uses Markdown ni asteriscos):

Impacto económico:
[1–2 frases sobre la ganancia, número de clientes retenidos y coste total]

Patrones comunes:
[1–2 frases sobre las características comunes entre los clientes en riesgo]

Estrategias:
1. [Primera recomendación accionable]
2. [Segunda recomendación accionable]
3. [Tercera recomendación accionable]

Evita cualquier encabezado adicional. Responde solo usando ese formato. Aquí tienes los datos:
{datos_json}
"""