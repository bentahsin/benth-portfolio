'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface TimeSeriesData {
  date: string;
  visits: number;
  unique: number;
  fullDate: string;
}

interface ChartProps {
  data: TimeSeriesData[];
}

const AnalyticsAreaChart: React.FC<ChartProps> = ({ data }) => {
  return (
      <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
        <XAxis
          dataKey="date"
          stroke="#888"
          tick={{fontSize: 12}}
          tickMargin={10}
        />
        <YAxis
          stroke="#888"
          tick={{fontSize: 12}}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
          labelStyle={{ color: '#aaa', marginBottom: '0.5rem' }}
          formatter={(value: number, name: string) => [value, name === 'visits' ? 'Toplam Ziyaret' : 'Tekil Ziyaretçi']}
        />

        <Area
          type="monotone"
          dataKey="visits"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorVisits)"
          strokeWidth={2}
          name="Toplam"
        />
        <Area
          type="monotone"
          dataKey="unique"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorUnique)"
          strokeWidth={2}
          name="Tekil"
        />
        </AreaChart>
      </ResponsiveContainer>
      </div>
  );
};

export default AnalyticsAreaChart;