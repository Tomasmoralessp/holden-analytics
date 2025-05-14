import requests
import os

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
    return f"""
You are an expert business analyst assistant.

Given the following churn prediction results:

- Threshold: {metrics['threshold']:.2f}
- Recall: {metrics['recall']:.1%}
- Precision: {metrics['precision']:.1%}
- Net Gain: {metrics['net_gain']:,.0f} €
- Total Retention Cost: {metrics['total_cost']:,.0f} €
- Customers Retained: {metrics['tp']}
- Customers Lost: {metrics['fn']}

Write a 3–4 line business recommendation that includes a short summary and a strategic suggestion to maximize retention impact.
"""
