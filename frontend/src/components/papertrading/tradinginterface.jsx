import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TradingInterface = ({ stock, onTrade }) => {
  const [action, setAction] = useState('buy');
  const [quantity, setQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(null); // State to store the fetched stock price
  const [symbol, setSymbol] = useState(null); // State to store the stock symbol

  // Update symbol state when the stock prop changes
  useEffect(() => {
    if (stock?.symbol) {
      setSymbol(stock.symbol);
    } else {
      setSymbol(null);
    }
  }, [stock]);

  // Fetch stock price when the symbol changes
  useEffect(() => {
    const fetchStockPrice = async () => {
      if (!symbol) return;

      try {
        // Fetch stock price from the API
        const response = await fetch('/api/get_stock_prices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock_symbols: [symbol] }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stock price');
        }

        const data = await response.json();
        console.log(data);
        console.log(symbol);
        console.log(data.stock_prices[symbol + ".NS"]);
        setStockPrice(data.stock_prices[symbol + ".NS"]); // Set the fetched price
      } catch (error) {
        console.error('Error fetching stock price:', error);
        setStockPrice(null); // Reset price on error
      }
    };

    fetchStockPrice();
  }, [symbol]);

  const handleTrade = (tradeAction) => {
    console.log('Executing trade:', tradeAction, symbol, quantity, stockPrice);
    if (!symbol || !quantity || quantity <= 0 || !stockPrice) return;
    onTrade(symbol, tradeAction, quantity, stockPrice); // Use the fetched price
  };

  if (!symbol) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
          <span className="text-2xl">📈</span>
        </div>
        <p className="text-gray-400 font-medium">Select an asset from the list to start trading</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Market Execution</h3>
          <p className="text-3xl font-black text-white">{symbol}</p>
        </div>
        {stockPrice && (
          <div className="text-right">
            <p className="text-sm text-gray-500 uppercase font-bold">Current Value</p>
            <p className="text-3xl font-black text-green-400">₹ {stockPrice.toLocaleString()}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Quantity</label>
          <Input
            type="number"
            placeholder="0"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="bg-white/5 border-white/10 h-14 rounded-2xl text-xl font-bold focus:border-green-500/50 transition-all text-white"
          />
        </div>

        <div className="flex items-end gap-3 h-14 mt-auto">
          <Button
            onClick={() => handleTrade('buy')}
            className="flex-1 h-full rounded-2xl bg-green-500 hover:bg-green-600 text-black font-black text-lg transition-all"
          >
            BUY
          </Button>
          <Button
            onClick={() => handleTrade('sell')}
            className="flex-1 h-full rounded-2xl bg-white/5 border border-white/10 hover:bg-red-500 hover:text-white font-black text-lg transition-all"
          >
            SELL
          </Button>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Estimated Total</span>
          <span className="text-white font-bold">₹ {(quantity * (stockPrice || 0)).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;