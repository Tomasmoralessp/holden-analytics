
import React from 'react';
import { ClassReport } from '@/types/analysis';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ClassificationTableProps {
  report: ClassReport;
}

const ClassificationTable: React.FC<ClassificationTableProps> = ({ report }) => {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  
  const getColorClass = (value: number) => {
    if (value >= 0.8) return 'bg-green-100 text-green-800';
    if (value >= 0.7) return 'bg-lime-100 text-lime-800';
    if (value >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Clase</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Precision
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">
                      Proporción de predicciones positivas que son correctas.
                      TP / (TP + FP)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Recall
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">
                      Proporción de casos positivos reales que se identificaron correctamente.
                      TP / (TP + FN)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                F1-Score
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">
                      Media armónica de precisión y recall.
                      2 * (precision * recall) / (precision + recall)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <div className="flex items-center gap-1">
                Clase 0 (No churn)
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">
                      Clientes que mantienen su suscripción.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getColorClass(report.class0.precision)}`}>
                {formatPercentage(report.class0.precision)}
              </span>
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getColorClass(report.class0.recall)}`}>
                {formatPercentage(report.class0.recall)}
              </span>
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getColorClass(report.class0.f1)}`}>
                {formatPercentage(report.class0.f1)}
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <div className="flex items-center gap-1">
                Clase 1 (Churn)
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">
                      Clientes que cancelan su suscripción.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getColorClass(report.class1.precision)}`}>
                {formatPercentage(report.class1.precision)}
              </span>
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getColorClass(report.class1.recall)}`}>
                {formatPercentage(report.class1.recall)}
              </span>
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getColorClass(report.class1.f1)}`}>
                {formatPercentage(report.class1.f1)}
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <div className="mt-6 text-center">
        <div className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-50 px-3 py-1.5">
          <span className="font-medium text-blue-700">Accuracy global:</span>
          <span className="font-bold text-blue-800">{formatPercentage(report.accuracy)}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={14} className="text-blue-500 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-64 text-xs">
                Proporción total de predicciones correctas.
                (TP + TN) / (TP + TN + FP + FN)
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ClassificationTable;
