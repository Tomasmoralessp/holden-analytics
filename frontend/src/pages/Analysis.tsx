
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

  const handleDemoData = async () => {
    setIsLoading(true);
    setError(null);
    
    // Simulating API call with demo data
    setTimeout(() => {
      setResults({
        metrics: {
          threshold: 0.5,
          totalCost: 12580,
          f1: 0.82,
          recall: 0.79,
          precision: 0.85
        },
        topRiskCustomers: [
          { id: "C1024", riskScore: 0.95 },
          { id: "C3819", riskScore: 0.92 },
          { id: "C5523", riskScore: 0.88 },
          { id: "C2210", riskScore: 0.85 },
          { id: "C4421", riskScore: 0.82 },
          { id: "C7792", riskScore: 0.78 },
          { id: "C3012", riskScore: 0.75 },
          { id: "C9156", riskScore: 0.72 },
          { id: "C2587", riskScore: 0.69 },
          { id: "C6114", riskScore: 0.66 }
        ],
        shapValues: [
          { feature: "Duración contrato", importance: 0.82, direction: "negative" },
          { feature: "Meses como cliente", importance: 0.76, direction: "negative" },
          { feature: "Gasto mensual", importance: 0.65, direction: "positive" },
          { feature: "Soporte técnico", importance: 0.58, direction: "negative" },
          { feature: "Método pago", importance: 0.52, direction: "positive" },
          { feature: "Servicio internet", importance: 0.45, direction: "positive" },
          { feature: "Edad", importance: 0.38, direction: "negative" },
          { feature: "Factura en papel", importance: 0.25, direction: "positive" }
        ],
        classificationReport: {
          accuracy: 0.84,
          class0: { precision: 0.88, recall: 0.92, f1: 0.90 },
          class1: { precision: 0.76, recall: 0.68, f1: 0.72 }
        }
      });
      setWasPreprocessed(true);
      setFileName('datos_demo.csv');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-holden-dark mb-8">Análisis Predictivo de Churn</h1>
        
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
