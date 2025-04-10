
import React from 'react';
import { ShapValue } from '@/types/analysis';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface ShapChartProps {
  shapValues: ShapValue[];
}

const ShapChart: React.FC<ShapChartProps> = ({ shapValues }) => {
  // Sort by importance descending
  const sortedData = [...shapValues].sort((a, b) => b.importance - a.importance);
  
  const formatData = sortedData.map(item => ({
    feature: item.feature,
    value: item.importance,
    direction: item.direction
  }));

  // For custom tooltip
  const config = {
    positive: { color: '#0ea5e9' }, // blue
    negative: { color: '#f43f5e' }, // red
  };

  return (
    <div className="w-full h-[400px]">
      <ChartContainer config={config}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formatData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              domain={[0, 1]} 
              tickFormatter={(value) => `${Math.round(value * 100)}%`}
            />
            <YAxis 
              type="category" 
              dataKey="feature"
              tick={{ fontSize: 13 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  formatter={(value, name, props) => {
                    const direction = props.payload.direction;
                    return [
                      `${(Number(value) * 100).toFixed(1)}%`,
                      `Impacto en churn: ${direction === 'positive' ? 'Aumenta' : 'Reduce'}`
                    ];
                  }}
                />
              }
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {formatData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.direction === 'positive' ? 'var(--color-positive)' : 'var(--color-negative)'}
                />
              ))}
              <LabelList 
                dataKey="value" 
                position="right" 
                formatter={(value: number) => `${Math.round(value * 100)}%`}
                style={{ fontSize: 12, fill: '#6b7280' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default ShapChart;
