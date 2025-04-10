
import React, { useRef } from 'react';
import { Upload, AlertCircle, FileCheck, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CustomButton from '@/components/ui/CustomButton';
import { AnalysisResult } from '@/types/analysis';
import { toast } from 'sonner';

interface UploadSectionProps {
  isLoading: boolean;
  fileName: string;
  error: string | null;
  setFileName: (name: string) => void;
  setResults: (results: AnalysisResult) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  onDemoData: () => void;
  setWasPreprocessed: (value: boolean) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  isLoading,
  fileName,
  error,
  setFileName,
  setResults,
  setIsLoading,
  setError,
  onDemoData,
  setWasPreprocessed
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    
    if (!file) return;
    
    // Validate file type
    if (!file.name.endsWith('.csv')) {
      setError('Solo se permiten archivos CSV');
      setFileName('');
      return;
    }
    
    setFileName(file.name);
    
    // In a real app, you would upload the file here
    // For now, we'll just simulate it
  };

  const handleFileUpload = async () => {
    if (!fileName) {
      setError('Por favor, selecciona un archivo CSV');
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulating API call
      // In a real app, you would use axios or fetch to upload the file
      setTimeout(() => {
        const mockProcessed = Math.random() > 0.5;
        setWasPreprocessed(mockProcessed);
        
        toast.success(`Archivo analizado correctamente${mockProcessed ? ' (datos preprocesados)' : ''}`);
        
        // Mock response data
        setResults({
          metrics: {
            threshold: 0.55,
            totalCost: 15420,
            f1: 0.78,
            recall: 0.81,
            precision: 0.75
          },
          topRiskCustomers: [
            { id: "C5024", riskScore: 0.98 },
            { id: "C1819", riskScore: 0.94 },
            { id: "C3523", riskScore: 0.89 },
            { id: "C7210", riskScore: 0.87 },
            { id: "C9421", riskScore: 0.84 },
            { id: "C2792", riskScore: 0.79 },
            { id: "C4012", riskScore: 0.76 },
            { id: "C8156", riskScore: 0.73 },
            { id: "C1587", riskScore: 0.70 },
            { id: "C5114", riskScore: 0.68 }
          ],
          shapValues: [
            { feature: "Duración contrato", importance: 0.85, direction: "negative" },
            { feature: "Meses como cliente", importance: 0.79, direction: "negative" },
            { feature: "Gasto mensual", importance: 0.68, direction: "positive" },
            { feature: "Soporte técnico", importance: 0.59, direction: "negative" },
            { feature: "Método pago", importance: 0.54, direction: "positive" },
            { feature: "Servicio internet", importance: 0.48, direction: "positive" },
            { feature: "Edad", importance: 0.40, direction: "negative" },
            { feature: "Factura en papel", importance: 0.28, direction: "positive" }
          ],
          classificationReport: {
            accuracy: 0.82,
            class0: { precision: 0.86, recall: 0.90, f1: 0.88 },
            class1: { precision: 0.74, recall: 0.66, f1: 0.70 }
          }
        });
        
        setIsLoading(false);
      }, 2000);
      
    } catch (err) {
      setError('Error al procesar el archivo');
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="shadow-lg border-holden-cyan/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-holden-dark">Subir archivo CSV</CardTitle>
        <CardDescription>
          Sube un archivo CSV con los datos de tus clientes para predecir la probabilidad de cancelación
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-holden-cyan/70 transition-colors cursor-pointer"
          onClick={triggerFileInput}
        >
          <input
            type="file"
            accept=".csv"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Haz clic para seleccionar un archivo o arrastra y suelta aquí
          </p>
          <p className="text-xs text-gray-500 mt-1">Solo archivos CSV</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {fileName && (
          <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-md">
            <FileCheck size={18} />
            <span className="font-medium">Archivo seleccionado:</span>
            <span className="text-gray-700">{fileName}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <CustomButton 
          onClick={handleFileUpload} 
          disabled={isLoading || !fileName} 
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : 'Analizar Datos'}
        </CustomButton>
        
        <CustomButton 
          variant="outline" 
          onClick={onDemoData} 
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          Usar Datos Demo
        </CustomButton>
      </CardFooter>
    </Card>
  );
};

export default UploadSection;
