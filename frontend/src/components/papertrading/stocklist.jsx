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
        if (!response.ok) throw new Error('Failed to fetch stocks');
        const data = await response.json();
        const tickers = Array.isArray(data.tickers) ? data.tickers.slice(0, 50) : []; // Limit for performance
        setStocks(tickers);
        setLoading(false);

        // Fetch prices for these tickers
        const symbols = tickers.map(t => t.symbol);
        const priceRes = await fetch('/api/get_stock_prices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock_symbols: symbols })
        });
        if (priceRes.ok) {
          const priceData = await priceRes.json();
          setStocks(prev => prev.map(s => ({
            ...s,
            price: priceData.stock_prices[s.symbol + ".NS"] || priceData.stock_prices[s.symbol] || 0,
            change: (Math.random() * 10) - 5, // Mock change for visual flair
            changePercent: (Math.random() * 4) - 2
          })));
        }
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
    <div className="overflow-hidden">
      <div className="relative mb-6">
        <Input
          placeholder="Search markets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/5 border-white/10 h-12 rounded-2xl pl-4 focus:border-green-500/50 transition-all text-white"
        />
      </div>

      <ScrollArea className="h-[500px] pr-4">
        {filteredStocks.length > 0 ? (
          <div className="space-y-2">
            {filteredStocks.map((stock) => (
              <div
                key={stock?.symbol || Math.random()}
                className="p-4 rounded-2xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-all group"
                onClick={() => onSelectStock(stock)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg group-hover:text-green-400 transition-colors uppercase text-white">{stock?.symbol || 'N/A'}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[120px]">{stock?.name || 'Unknown'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white tracking-tighter">
                      ₹ {stock?.price ? stock.price.toLocaleString() : '0.00'}
                    </p>
                    <div
                      className={`flex items-center justify-end text-xs font-bold ${(stock?.change || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                    >
                      {(stock?.change || 0) >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {stock?.changePercent !== undefined ? Math.abs(stock.changePercent).toFixed(2) : '0.00'}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500">No assets found</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default StockList;
