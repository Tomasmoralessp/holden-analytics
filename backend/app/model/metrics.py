from sklearn.metrics import classification_report

def get_classification_report(y_true, y_pred):
    return classification_report(y_true, y_pred, output_dict=True)

def format_classification_report(report_dict):
    formatted = {}
    for key, value in report_dict.items():
        if isinstance(value, dict):
            formatted[key] = {
                "precision": float(value["precision"]),
                "recall": float(value["recall"]),
                "f1_score": float(value["f1-score"]),
                "support": int(value["support"])
            }
        else:
            formatted[key] = float(value)
    return formatted
