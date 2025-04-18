import React, { useRef, useState } from "react";
import {
  Upload,
  AlertCircle,
  FileCheck,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomButton from "@/components/ui/CustomButton";
import { AnalysisResult } from "@/types/analysis";
import { toast } from "sonner";

interface UploadSectionProps {
  isLoading: boolean;
  fileName: string;
  error: string | null;
  setFileName: (name: string) => void;
  setResults: (results: AnalysisResult) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  onDemoData: (options?: { cost_fn: number; cost_fp: number }) => void;
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
  setWasPreprocessed,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_URL = import.meta.env.VITE_API_URL as string;

  const [costFn, setCostFn] = useState<number>(100);
  const [costFp, setCostFp] = useState<number>(10);

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setError("Solo se permiten archivos CSV");
      setFileName("");
      return;
    }

    setFileName(file.name);
  };

  const handleFileUpload = async () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setError("Por favor, selecciona un archivo CSV");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("cost_fn", costFn.toString());
      formData.append("cost_fp", costFp.toString());
      formData.append("preprocessed", "false");

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(await response.text());

      const data: AnalysisResult & { was_preprocessed?: boolean } = await response.json();

      setResults({
        ...data,
        cost_fn: costFn,
        cost_fp: costFp,
        _timestamp: Date.now(), // <-- forzar re-render
      });
      
      

      setWasPreprocessed(data.was_preprocessed === true);
      toast.success("Archivo analizado correctamente");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al procesar el archivo";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-holden-cyan/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-holden-dark">
          Subir archivo CSV
        </CardTitle>
        <CardDescription>
          Sube un archivo CSV con los datos de tus clientes para predecir la
          probabilidad de cancelación
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coste por Falso Negativo</label>
            <input
              type="number"
              value={costFn}
              onChange={(e) => setCostFn(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-holden-cyan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coste por Falso Positivo</label>
            <input
              type="number"
              value={costFp}
              onChange={(e) => setCostFp(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-holden-cyan"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <CustomButton
          onClick={handleFileUpload}
          disabled={isLoading || !fileName}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...
            </>
          ) : (
            "Analizar Datos"
          )}
        </CustomButton>

        <CustomButton
          variant="outline"
          onClick={() => onDemoData({ cost_fn: costFn, cost_fp: costFp })}
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
