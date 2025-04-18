import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsCardProps {
  metrics: {
    threshold: number;
    f1: number;
    recall: number;
    precision: number;
    totalCost: number;
    fp: number;
    fn: number;
    tp: number;
    tn: number; // <- aunque no lo uses aún, inclúyelo si lo estás pasando
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
    totalCost,
    fp,
    fn,
    cost_fp,
  } = metrics;

  const valorClienteRetenido = 300;
  const valorClientePerdido = 300;

  const totalPositivos = fn / (1 - recall);
  const clientesSalvados = Math.round(totalPositivos * recall);

  const ingresoRetenidos = clientesSalvados * valorClienteRetenido;
  const beneficioNeto = ingresoRetenidos - totalCost;
  const costeMedioCliente = totalCost / (clientesSalvados || 1);
  const costeTotalFN = fn * valorClientePerdido;
  const costeTotalFP = fp * cost_fp;

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatCurrency = (value: number) => `${value.toLocaleString()} €`;

  return (
    <Card className="shadow-xl border-blue-100">
      <CardHeader className="bg-emerald-50 py-4 rounded-t-md">
        <CardTitle className="text-2xl font-bold text-center text-emerald-700">
          📈 Ganancia estimada neta: <br />
          <span className="text-4xl text-emerald-600">{formatCurrency(beneficioNeto)}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-500">Clientes potencialmente retenidos</p>
            <p className="text-xl font-semibold text-holden-dark">{clientesSalvados}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ingresos estimados</p>
            <p className="text-xl font-semibold text-green-600">{formatCurrency(ingresoRetenidos)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Coste total de retención</p>
            <p className="text-xl font-semibold text-orange-600">{formatCurrency(totalCost)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Coste por cliente retenido</p>
            <p className="text-xl font-semibold text-blue-700">{formatCurrency(costeMedioCliente)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pérdida por clientes no retenidos (FN)</p>
            <p className="text-xl font-semibold text-red-600">{formatCurrency(costeTotalFN)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Coste por falsos positivos</p>
            <p className="text-xl font-semibold text-yellow-600">{formatCurrency(costeTotalFP)}</p>
          </div>
        </div>

        <div className="text-sm text-center text-gray-500 border-t border-gray-100 pt-4">
          <p><strong>🧪 DEBUG:</strong> Coste FP usado: <strong>{cost_fp}</strong> €</p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>🎛️ Umbral de clasificación</span>
              <span>{formatPercentage(threshold)}</span>
            </div>
            <div className="flex justify-between">
              <span>🎯 Precisión (aciertos sobre alertas)</span>
              <span>{formatPercentage(precision)}</span>
            </div>
            <div className="flex justify-between">
              <span>🔍 Recall (clientes en riesgo detectados)</span>
              <span>{formatPercentage(recall)}</span>
            </div>
            <div className="flex justify-between">
              <span>📊 F1-Score</span>
              <span>{formatPercentage(f1)}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center pt-4">
          Este análisis estima los ingresos potenciales al retener clientes en riesgo. Se basa en un valor promedio de <strong>{formatCurrency(valorClienteRetenido)}</strong> por cliente retenido y una pérdida equivalente de <strong>{formatCurrency(valorClientePerdido)}</strong> por cliente perdido.
        </p>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
