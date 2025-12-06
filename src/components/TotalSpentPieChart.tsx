

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";
import { getText } from "@/utils/translations";
import { useLanguage } from "@/contexts/LanguageContext";

const COLORS = ["#FF8042", "#00f3d7"]; // Orange for Total Spent, Blue for Avg List Cost

interface PieChartData {
  name: string;
  value: number;
}

interface TotalSpentPieChartProps {
  totalSpent: number;
  avgListCost: number;
}

export const TotalSpentPieChart: React.FC<TotalSpentPieChartProps> = ({
  totalSpent,
  avgListCost
}) => {
  const { language } = useLanguage();

  const data: PieChartData[] = [
    { name: getText("totalSpent", language), value: totalSpent },
    { name: getText("avgListCost", language), value: avgListCost }
  ];

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle>{getText("spendingSummary", language)}</CardTitle>
        <CardDescription>{getText("totalVsAverageCost", language)}</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${formatCurrency(value, "BDT")}`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatCurrency(value, "BDT")} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

