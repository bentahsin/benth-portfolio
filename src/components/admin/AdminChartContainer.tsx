'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

interface ChartProps {
  type: 'bar' | 'pie';
  data: any[];
  colors?: string[];
  color?: string;
}

const AdminChartContainer: React.FC<ChartProps> = ({ type, data, colors, color }) => {
  if (data.length === 0) {
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666'}}>Veri yok</div>;
  }

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors?.[index % colors.length] || '#0088FE'} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip
          cursor={{ fill: '#333' }}
          contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: '#fff' }}
        />
        <Bar dataKey="count" fill={color || "#8884d8"} radius={[4, 4, 0, 0]} name="Ziyaret Sayısı" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AdminChartContainer;