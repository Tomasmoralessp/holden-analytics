
import React from 'react';
import { AnalysisMetrics } from '@/types/analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';

interface MetricsCardProps {
  metrics: AnalysisMetrics;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ metrics }) => {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Métricas de rendimiento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-500">Threshold</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">
                      Umbral de probabilidad para clasificar como churn. 
                      Valores por encima de este umbral se consideran en riesgo.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-sm font-semibold">{formatPercentage(metrics.threshold)}</span>
            </div>
            <Progress value={metrics.threshold * 100} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-500">F1-Score</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">
                      Media armónica entre precisión y exhaustividad. 
                      Un mejor balance entre falsos positivos y falsos negativos.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-sm font-semibold">{formatPercentage(metrics.f1)}</span>
            </div>
            <Progress value={metrics.f1 * 100} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-500">Recall</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">
                      Proporción de clientes en riesgo real que el modelo identifica correctamente.
                      Más alto = menos falsos negativos.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-sm font-semibold">{formatPercentage(metrics.recall)}</span>
            </div>
            <Progress value={metrics.recall * 100} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-500">Precision</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">
                      Proporción de predicciones de riesgo que son correctas.
                      Más alto = menos falsos positivos.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-sm font-semibold">{formatPercentage(metrics.precision)}</span>
            </div>
            <Progress value={metrics.precision * 100} className="h-2" />
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-500">Coste estimado de retención</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={14} className="text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64 text-xs">
                    Estimación del coste total para implementar estrategias de retención
                    para los clientes identificados en riesgo.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-lg font-bold text-holden-cyan">{metrics.totalCost.toLocaleString()} €</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
