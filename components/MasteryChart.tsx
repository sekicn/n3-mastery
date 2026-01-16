
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface MasteryChartProps {
  data: { date: string; mastery: number }[];
}

export const MasteryChart: React.FC<MasteryChartProps> = ({ data }) => {
  return (
    <div className="h-72 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">掌握度增长趋势</p>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Growth Trajectory</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastery Index</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
            domain={[0, 100]}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '20px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              padding: '12px 16px',
              fontFamily: 'Inter',
              fontWeight: 900
            }}
          />
          <Area 
            type="monotone" 
            dataKey="mastery" 
            stroke="#4f46e5" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorMastery)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
