import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { parse } from 'papaparse'; // For parsing CSV data

const StockChart = ({ stock, historicalData }) => {
  const [timeframe, setTimeframe] = useState('1M');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (historicalData) {
      // Parse the CSV data
      const parsedData = parse(historicalData, { header: true }).data;

      // Transform the parsed data into the format required by the chart
      const transformedData = parsedData.map((row) => ({
        date: row.Date.split(' ')[0], // Extract date part only
        price: parseFloat(row.Close), // Use the "Close" price for the chart
      }));

      // Filter data based on the selected timeframe
      const filteredData = filterDataByTimeframe(transformedData, timeframe);
      setChartData(filteredData);
    }
  }, [historicalData, timeframe]);

  const filterDataByTimeframe = (data, timeframe) => {
    const now = new Date();
    let cutoffDate;

    switch (timeframe) {
      case '1D':
        cutoffDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case '1W':
        cutoffDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case '1M':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case '3M':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case '1Y':
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
    }

    return data.filter((item) => new Date(item.date) >= cutoffDate);
  };

  if (!stock) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
          <div className="relative w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 ring-8 ring-white/5">
            <span className="text-4xl animate-pulse">📊</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Market Analysis</h3>
        <p className="text-gray-500 max-w-[280px]">Select a ticker from the market list to view real-time performance data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-green-500/10 text-green-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter border border-green-500/20">Live Market</span>
            <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">{stock.symbol}</h2>
          </div>
          <p className="text-sm text-gray-500 font-medium">{stock.name}</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeframe === tf
                  ? 'bg-white text-black shadow-lg'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 'bold' }}
              minTickGap={30}
            />
            <YAxis
              domain={['auto', 'auto']}
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 'bold' }}
              tickFormatter={(val) => `₹${val.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#fff'
              }}
              formatter={(value) => [`₹ ${value.toLocaleString()}`, 'Price']}
              itemStyle={{ color: '#22c55e' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;