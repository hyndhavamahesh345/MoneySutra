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
      <div className="bg-white p-4 rounded-lg shadow-sm h-96 flex items-center justify-center">
        <p className="text-gray-500">Select a stock to view chart</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{stock.symbol} - {stock.name}</h2>
        <div className="flex gap-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#3b82f6" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;