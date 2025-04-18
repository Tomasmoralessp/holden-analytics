import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import MetricsCard from "@/components/analysis/MetricsCard";
import RiskTable from "@/components/analysis/RiskTable";
import ShapChart from "@/components/analysis/ShapChart";
import ClassificationTable from "@/components/analysis/ClassificationTable";
import { AnalysisResult } from "@/types/analysis";

interface ResultsSectionProps {
  results: AnalysisResult;
  fileName: string;
  wasPreprocessed: boolean;
  onReset: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  fileName,
  wasPreprocessed,
  onReset,
}) => {
  const {
    threshold,
    coste_total,
    f1,
    recall,
    precision,
    fn,
    fp,
    tp,
    cost_fn,
    cost_fp,
    shap_summary,
    top_customers_at_risk,
    classification_report,
  } = results;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-holden-dark mb-1">
            Resultados del Análisis
          </h2>
          <p className="text-sm text-muted-foreground">
            Archivo: {fileName} | {wasPreprocessed ? "Datos preprocesados" : "Datos crudos"}
          </p>
        </div>
        <Button variant="ghost" onClick={onReset} className="text-holden-dark">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
      </div>

      <div className="space-y-12">
        <MetricsCard
          metrics={{
            threshold,
            f1,
            recall,
            precision,
            fn,
            fp,
            tp,
            cost_fn,
            cost_fp,
          }}
        />

        <ShapChart shapValues={shap_summary} />

        <RiskTable customers={top_customers_at_risk} />

        <ClassificationTable report={classification_report} />
      </div>
    </div>
  );
};

export default ResultsSection;
