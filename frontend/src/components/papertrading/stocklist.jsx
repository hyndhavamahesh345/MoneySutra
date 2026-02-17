import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StockList = ({ onSelectStock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks, setStocks] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('/api/stocks');
        if (!response.ok) {
          throw new Error('Failed to fetch stocks');
        }
        const data = await response.json();
        setStocks(Array.isArray(data.tickers) ? data.tickers : []); // Ensure data.tickers is an array
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const filteredStocks = stocks.filter(
    (stock) =>
      (stock?.symbol || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (stock?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p>Loading stocks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <Input
        placeholder="Search stocks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="h-96">
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock) => (
            <div
              key={stock?.symbol || Math.random()} // Use fallback key if symbol is missing
              className="p-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectStock(stock)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{stock?.symbol || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{stock?.name || 'Unknown'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">
                    ${stock?.price ? stock.price.toFixed(2) : '0.00'}
                  </p>
                  <div
                    className={`flex items-center text-sm ${
                      stock?.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stock?.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    {stock?.changePercent !== undefined ? stock.changePercent.toFixed(2) : '0.00'}%
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No stocks found</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default StockList;
