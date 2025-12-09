import { useState, useEffect } from 'react';
import {
  Area,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

interface AreaChartProps {
  data: {
    name: string;
    value: number;
    secondaryValue?: number;
  }[];
  height?: number;
  showXAxis?: boolean;
  showTooltip?: boolean;
}

export function AreaChart({
  data,
  height = 200,
  showXAxis = true,
  showTooltip = true,
}: AreaChartProps) {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  return (
    <div className="mt-4" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="areaGradientSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          {showXAxis && (
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
          )}
          <YAxis tickLine={false} axisLine={false} />
          {showTooltip && <Tooltip formatter={(value: number) => `৳ ${value.toFixed(2)}`} />}
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            fillOpacity={1}
            fill="url(#areaGradient)"
            name="Total Spent"
          />
          <Area
            type="monotone"
            dataKey="secondaryValue"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#areaGradientSecondary)"
            name="Avg. List Cost"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
