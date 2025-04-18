import React from 'react';
import { ClassificationReport, ClassificationMetrics } from '@/types/analysis';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ClassificationTableProps {
  report: ClassificationReport;
}

const ClassificationTable: React.FC<ClassificationTableProps> = ({ report }) => {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

  const getColorClass = (value: number) => {
    if (value >= 0.8) return 'bg-green-100 text-green-800';
    if (value >= 0.7) return 'bg-lime-100 text-lime-800';
    if (value >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  const class0 = report["0"] as ClassificationMetrics;
  const class1 = report["1"] as ClassificationMetrics;
  const accuracy = report.accuracy as number;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Clase</TableHead>
            <TableHead>Precision</TableHead>
            <TableHead>Recall</TableHead>
            <TableHead>F1-Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Clase 0 (No churn)</TableCell>
            <TableCell className={getColorClass(class0.precision)}>{formatPercentage(class0.precision)}</TableCell>
            <TableCell className={getColorClass(class0.recall)}>{formatPercentage(class0.recall)}</TableCell>
            <TableCell className={getColorClass(class0.f1_score)}>{formatPercentage(class0.f1_score)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Clase 1 (Churn)</TableCell>
            <TableCell className={getColorClass(class1.precision)}>{formatPercentage(class1.precision)}</TableCell>
            <TableCell className={getColorClass(class1.recall)}>{formatPercentage(class1.recall)}</TableCell>
            <TableCell className={getColorClass(class1.f1_score)}>{formatPercentage(class1.f1_score)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-50 px-3 py-1.5">
          <span className="font-medium text-blue-700">Accuracy global:</span>
          <span className="font-bold text-blue-800">{formatPercentage(accuracy)}</span>
        </div>
      </div>
    </div>
  );
};

export default ClassificationTable;
