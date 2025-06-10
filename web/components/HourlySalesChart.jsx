import React, { useState } from "react";
import { Card } from "@shopify/polaris";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const HourlySalesChart = () => {
    const data = [
        { hour: "00:00", sales: 2 },
        { hour: "01:00", sales: 1 },
        { hour: "02:00", sales: 0 },
        { hour: "03:00", sales: 3 },
        { hour: "04:00", sales: 5 },
        { hour: "05:00", sales: 8 },
        { hour: "06:00", sales: 4 },
        { hour: "07:00", sales: 6 },
        { hour: "08:00", sales: 10 },
        { hour: "09:00", sales: 12 },
        { hour: "10:00", sales: 9 },
        { hour: "11:00", sales: 7 },
        { hour: "12:00", sales: 13 },
        { hour: "13:00", sales: 14 },
        { hour: "14:00", sales: 9 },
        { hour: "15:00", sales: 6 },
        { hour: "16:00", sales: 8 },
        { hour: "17:00", sales: 11 },
        { hour: "18:00", sales: 15 },
        { hour: "19:00", sales: 17 },
        { hour: "20:00", sales: 13 },
        { hour: "21:00", sales: 8 },
        { hour: "22:00", sales: 4 },
        { hour: "23:00", sales: 2 },
    ];

    const [hourlySalesData, setHourlySalesData] = useState(data);

  return (
    <Card>
        <div style={{ width: "100%", height: 350, padding: "20px" }}>
            <h2 style={{ marginBottom: "1rem" }}>Today's Hourly Sales</h2>
            <ResponsiveContainer>
                <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </Card>
  );
};

export default HourlySalesChart;