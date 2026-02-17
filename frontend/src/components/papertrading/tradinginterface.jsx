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
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-gray-500">Select a stock to trade</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-24"
        />
        <Button onClick={() => handleTrade('buy')}>Buy</Button>
        <Button onClick={() => handleTrade('sell')}>Sell</Button>
      </div>
      {stockPrice && (
        <p className="mt-2 text-sm text-gray-500">
          Current Price: ${stockPrice.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default TradingInterface;