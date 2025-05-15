import requests
import os
import json

api_key = os.getenv("OPENROUTER_API_KEY") or "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"


def ask_openrouter(prompt: str, model="deepseek/deepseek-prover-v2:free", api_key: str = api_key) -> str:
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

    full_response = response.json()
    print("LLM RESPONSE:", json.dumps(full_response, indent=2))

    text = full_response["choices"][0]["message"]["content"].strip()

    if text.startswith("```") and text.endswith("```"):
        text = text.strip("`")
        lines = text.splitlines()
        if lines and lines[0].startswith("plaintext"):
            lines = lines[1:]
        text = "\n".join(lines).strip()

    return text

def build_prompt(metrics: dict) -> str:
    datos_json = json.dumps(metrics, indent=2)

    return f"""
Actúa como un experto en retención de clientes en telecomunicaciones.

Usa el siguiente formato EXACTO (sin Markdown, sin asteriscos, sin comillas, sin bloques de código):

Impacto económico:
[Texto plano con 1 o 2 frases sobre la ganancia, clientes retenidos y coste total]

Patrones comunes:
[Texto plano con 1 o 2 frases sobre las características comunes entre clientes en riesgo]

Estrategias:
1. [Primera recomendación accionable]
2. [Segunda recomendación accionable]
3. [Tercera recomendación accionable]

Aquí tienes un ejemplo de cómo debe ser el output final:

Impacto económico:
La estrategia aplicada ha generado una ganancia neta de 120.000€, reteniendo 450 clientes a un coste de 30.000€.

Patrones comunes:
Los clientes en riesgo suelen tener contratos mensuales, facturación sin papel y cargos superiores a la media.

Estrategias:
1. Ofrecer descuentos por permanencia a clientes con contratos flexibles.
2. Promover servicios adicionales como soporte técnico o protección de datos.
3. Incentivar métodos de pago más estables como domiciliación bancaria.

Evita cualquier encabezado adicional o comentario. Aquí están los datos a analizar:
{datos_json}
""".strip()
