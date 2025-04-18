import React from "react";
import { ShapSummaryItem } from "@/types/analysis";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList } from "recharts";

interface ShapChartProps {
  shapValues: ShapSummaryItem[];
}

const ShapChart: React.FC<ShapChartProps> = ({ shapValues }) => {
  const sorted = [...shapValues].sort((a, b) => b.importance - a.importance);
  const maxImportance = sorted[0]?.importance || 1;

  // Generar un degradado en rojo (más oscuro = más importante)
  const getBarColor = (importance: number) => {
    const intensity = Math.round((importance / maxImportance) * 255);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`; // rojo puro a rosa claro
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
          <XAxis
            type="number"
            domain={[0, maxImportance]}
            tickFormatter={(v) => `${Math.round(v * 100)}%`}
          />
          <YAxis
            type="category"
            dataKey="feature"
            tick={{ fontSize: 13 }}
          />
          <Tooltip
            formatter={(value, name, props) => [
              `${(value as number * 100).toFixed(1)}%`,
              "Importancia"
            ]}
          />
          <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
            {sorted.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.importance)} />
            ))}
            <LabelList
              dataKey="importance"
              position="right"
              formatter={(value: number) => `${Math.round(value * 100)}%`}
              style={{ fontSize: 12, fill: "#6b7280" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShapChart;
