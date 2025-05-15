import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UploadSection from '@/components/analysis/UploadSection';
import ResultsSection from '@/components/analysis/ResultsSection';
import { AnalysisResult } from '@/types/analysis';

const Analysis: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [wasPreprocessed, setWasPreprocessed] = useState<boolean>(false);

  const handleReset = () => {
    setFileName('');
    setResults(null);
    setError(null);
  };

  const handleDemoData = async (options?: { cost_fn: number; cost_fp: number }) => {
  setIsLoading(true);
  setError(null);

  const { cost_fn = 100, cost_fp = 10 } = options || {};

  setTimeout(() => {
    const demoResults: AnalysisResult = {
      threshold: 0.5,
      coste_total: 12580,
      totalCost: 12580,
      f1: 0.82,
      recall: 0.79,
      precision: 0.85,
      fn: 45,
      fp: 25,
      tp: 105,
      tn: 325,
      cost_fn,
      cost_fp,
      recommendation: `Impacto económico:
La estrategia ha generado una ganancia neta estimada de 27.920 €, reteniendo 105 clientes con un coste total de 12.580 €.

Patrones comunes:
Los clientes en riesgo suelen tener contratos de corto plazo, gastos mensuales elevados y no cuentan con servicios adicionales como soporte técnico o seguridad.

Estrategias:
1. Ofrecer descuentos por permanencia a clientes de alto riesgo con contratos mensuales.
2. Incluir soporte técnico gratuito durante 6 meses para fomentar fidelización.
3. Implementar campañas proactivas por SMS con ofertas personalizadas según perfil de consumo.`,

      top_customers_at_risk: [
        { id: "C1024", risk_score: 0.95 },
        { id: "C3819", risk_score: 0.92 },
        { id: "C5523", risk_score: 0.88 },
        { id: "C2210", risk_score: 0.85 },
        { id: "C4421", risk_score: 0.82 }
      ],
      shap_summary: [
        { feature: "Duración contrato", importance: 0.82, direction: -0.45 },
        { feature: "Meses como cliente", importance: 0.76, direction: -0.32 },
        { feature: "Gasto mensual", importance: 0.65, direction: 0.28 }
      ],
      classification_report: {
        accuracy: 0.84,
        "0": { precision: 0.88, recall: 0.92, f1_score: 0.90, support: 400 },
        "1": { precision: 0.76, recall: 0.68, f1_score: 0.72, support: 150 }
      }
    };

    setResults(demoResults);
    setWasPreprocessed(true);
    setFileName("demo_datos.csv");
    setIsLoading(false);
  }, 1000);
};



  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        {!results ? (
          <UploadSection
            isLoading={isLoading}
            fileName={fileName}
            setFileName={setFileName}
            setResults={setResults}
            setIsLoading={setIsLoading}
            setError={setError}
            error={error}
            onDemoData={handleDemoData}
            setWasPreprocessed={setWasPreprocessed}
          />
        ) : (
          <ResultsSection
            results={results}
            fileName={fileName}
            wasPreprocessed={wasPreprocessed}
            onReset={handleReset}
          />
        )}
      </main>
      <Footer />
      
    </div>
  );
};

export default Analysis;
