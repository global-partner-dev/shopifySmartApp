// DailySalesChart.jsx
import React, { useState } from "react";
import { Card } from "@shopify/polaris";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const DailySalesChart = () => {

  const data = [
    { date: "June 1", sales: 100 },
    { date: "June 2", sales: 120 },
    { date: "June 3", sales: 150 },
    { date: "June 4", sales: 80 },
    { date: "June 5", sales: 200 },
    { date: "June 6", sales: 170 },
    { date: "June 7", sales: 220 },
  ];
  
  const [dailySalesData, setDailySalesData] = useState(data);
  
  return (
    <Card>
        <div style={{ width: "100%", height: 350, padding: "20px" }}>
          <h2 style={{ marginBottom: "1rem" }}>Daily Sales</h2>
          <ResponsiveContainer>
              <AreaChart data={dailySalesData}>
              <defs>
                  <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#salesColor)"
              />
              </AreaChart>
          </ResponsiveContainer>
        </div>
    </Card>
  );
};

export default DailySalesChart;
