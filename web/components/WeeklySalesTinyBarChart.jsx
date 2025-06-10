import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card } from "@shopify/polaris";


const WeeklySalesTinyBarChart = () => {

  const data = [
    { day: "Mon", sales: 140 },
    { day: "Tue", sales: 160 },
    { day: "Wed", sales: 120 },
    { day: "Thu", sales: 180 },
    { day: "Fri", sales: 200 },
    { day: "Sat", sales: 220 },
    { day: "Sun", sales: 190 },
  ];

  const [weeklySalesData, setWeeklySalesData] = useState(data);
  return (
    <Card>
      <div style={{ width: "100%", height: 350, padding: "10px" }}>
        <h3 style={{ marginBottom: "1rem" }}>Weekly Sales</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default WeeklySalesTinyBarChart;
