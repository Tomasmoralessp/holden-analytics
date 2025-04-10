
import React from 'react';
import { AnalysisResult } from '@/types/analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomButton from '@/components/ui/CustomButton';
import { FileCheck, RotateCcw, Copy, ArrowUpDown, Info } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import MetricsCard from './MetricsCard';
import ShapChart from './ShapChart';
import ClassificationTable from './ClassificationTable';

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
  onReset 
}) => {
  const copyToClipboard = () => {
    const textToCopy = results.topRiskCustomers
      .map(customer => `${customer.id}: ${(customer.riskScore * 100).toFixed(1)}%`)
      .join('\n');
    
    navigator.clipboard.writeText(textToCopy);
    toast.success('Datos copiados al portapapeles');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <FileCheck className="text-green-500" size={20} />
          <span className="font-medium">Archivo analizado:</span>
          <span className="text-holden-dark">{fileName}</span>
          
          {wasPreprocessed && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 cursor-help">
                  <Info size={12} className="mr-1" />
                  Preprocesado
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-64 text-xs">
                  Este dataset ya ha sido preprocesado, incluyendo normalización,
                  codificación de variables categóricas y manejo de valores faltantes.
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        
        <CustomButton variant="outline" onClick={onReset} className="flex items-center gap-2">
          <RotateCcw size={16} />
          Reiniciar análisis
        </CustomButton>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Métricas generales */}
        <MetricsCard metrics={results.metrics} />
        
        {/* Top clientes en riesgo */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Top clientes en riesgo</CardTitle>
            <CustomButton 
              variant="ghost" 
              size="sm" 
              onClick={copyToClipboard}
              className="h-8 px-2"
            >
              <Copy size={16} className="mr-1" />
              Copiar
            </CustomButton>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Cliente</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      Riesgo de cancelación
                      <ArrowUpDown size={14} />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.topRiskCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell className="text-right">
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        customer.riskScore > 0.8 
                          ? 'bg-red-100 text-red-800' 
                          : customer.riskScore > 0.7 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {(customer.riskScore * 100).toFixed(1)}%
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* SHAP Global */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Importancia global de variables (SHAP)</CardTitle>
          </CardHeader>
          <CardContent>
            <ShapChart shapValues={results.shapValues} />
          </CardContent>
        </Card>
        
        {/* Classification Report */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Reporte de clasificación</CardTitle>
          </CardHeader>
          <CardContent>
            <ClassificationTable report={results.classificationReport} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsSection;
