
export interface AnalysisMetrics {
  threshold: number;
  totalCost: number;
  f1: number;
  recall: number;
  precision: number;
}

export interface RiskCustomer {
  id: string;
  riskScore: number;
}

export interface ShapValue {
  feature: string;
  importance: number;
  direction: 'positive' | 'negative';
}

export interface ClassReport {
  accuracy: number;
  class0: {
    precision: number;
    recall: number;
    f1: number;
  };
  class1: {
    precision: number;
    recall: number;
    f1: number;
  };
}

export interface AnalysisResult {
  metrics: AnalysisMetrics;
  topRiskCustomers: RiskCustomer[];
  shapValues: ShapValue[];
  classificationReport: ClassReport;
}
