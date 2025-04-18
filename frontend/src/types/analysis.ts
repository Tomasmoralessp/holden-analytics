// src/types/analysis.ts

export interface ShapSummaryItem {
  feature: string;
  importance: number;
  direction: number;
}

export interface RiskCustomer {
  id: string | number;
  risk_score: number;
}

export interface ClassificationMetrics {
  precision: number;
  recall: number;
  f1_score: number;
  support: number;
}

export interface ClassificationReport {
  [key: string]: ClassificationMetrics | number; // "0", "1", "macro avg", "accuracy" (como number), etc.
}

export interface AnalysisResult {
  threshold: number;
  coste_total: number;
  f1: number;
  recall: number;
  precision: number;
  fn: number;
  fp: number;
  tp: number;
  tn: number;
  shap_summary: ShapSummaryItem[];
  top_customers_at_risk: RiskCustomer[];
  classification_report: ClassificationReport;
  cost_fn: number; // Añadir para reflejar valores recibidos
  cost_fp: number;
}

