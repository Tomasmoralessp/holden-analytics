import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsCardProps {
  metrics: {
    threshold: number;
    f1: number;
    recall: number;
    precision: number;
    tp: number;
    fn: number;
    fp: number;
    tn: number;
    cost_fn: number;
    cost_fp: number;
  };
}

const MetricsCard: React.FC<MetricsCardProps> = ({ metrics }) => {
  const {
    threshold,
    f1,
    recall,
    precision,
    tp,
    fn,
    fp,
    cost_fn,
    cost_fp
  } = metrics;

  const valorCliente = 300;
  const ingresoRetenidos = tp * valorCliente;
  const costeTotal = fn * cost_fn + fp * cost_fp;
  const gananciaNeta = ingresoRetenidos - costeTotal;
  const costeMedioCliente = tp > 0 ? costeTotal / tp : 0;
  const perdidaFN = fn * valorCliente;
  const costeFP = fp * cost_fp;

  const formatCurrency = (value?: number) =>
    typeof value === "number" ? `${value.toLocaleString()} €` : "–";

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <Card className="shadow-xl border-blue-100">
      <CardHeader className="bg-emerald-50 py-4 rounded-t-md">
        <CardTitle className="text-2xl font-bold text-center text-emerald-700">
          Ganancia estimada neta: 
          <br />
          <span className="text-4xl text-emerald-600">
            {formatCurrency(gananciaNeta)}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-500">Clientes retenidos</p>
            <p className="text-xl font-semibold text-holden-dark">{tp}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ingresos estimados</p>
            <p className="text-xl font-semibold text-green-600">{formatCurrency(ingresoRetenidos)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Coste total</p>
            <p className="text-xl font-semibold text-orange-600">{formatCurrency(costeTotal)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Coste medio por cliente</p>
            <p className="text-xl font-semibold text-blue-700">{formatCurrency(costeMedioCliente)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pérdida por clientes no retenidos (FN)</p>
            <p className="text-xl font-semibold text-red-600">{formatCurrency(perdidaFN)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Coste por falsos positivos</p>
            <p className="text-xl font-semibold text-yellow-600">{formatCurrency(costeFP)}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Umbral de clasificación</span>
              <span>{formatPercentage(threshold)}</span>
            </div>
            <div className="flex justify-between">
              <span>Precisión</span>
              <span>{formatPercentage(precision)}</span>
            </div>
            <div className="flex justify-between">
              <span>Recall</span>
              <span>{formatPercentage(recall)}</span>
            </div>
            <div className="flex justify-between">
              <span>F1-Score</span>
              <span>{formatPercentage(f1)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
