import React, { useEffect, useState } from 'react';

const Portfolio = ({ portfolio, transactions }) => {
  // Validate and sanitize inputs
  if (!portfolio || typeof portfolio !== 'object') {
    portfolio = {};
  }
  if (!transactions || !Array.isArray(transactions)) {
    transactions = [];
  }

  // State to store stock prices
  const [stockPrices, setStockPrices] = useState({});

  // Fetch stock prices when the component mounts or when the portfolio changes
  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const stockSymbols = Object.keys(portfolio);
        if (stockSymbols.length === 0) return;

        // Fetch stock prices from the API
        const response = await fetch('/api/get_stock_prices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock_symbols: stockSymbols }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stock prices');
        }
        const data = await response.json();
        console.log(data);
        setStockPrices(data.stock_prices);
      } catch (error) {
        console.error('Error fetching stock prices:', error);
      }
    };

    fetchStockPrices();
  }, [portfolio]);

  // Calculate the total value of the portfolio
  const totalPortfolioValue = Object.keys(portfolio).reduce((total, symbol) => {
    try {
      const price = stockPrices[symbol + ".NS"];
      const quantity = portfolio[symbol];
      if (typeof price === 'number' && typeof quantity === 'number') {
        return total + price * quantity;
      }
    } catch (error) {
      console.error(`Error calculating value for ${symbol}:`, error);
    }
    return total;
  }, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-2">Active Positions</h2>

        {Object.keys(portfolio).length === 0 ? (
          <div className="py-12 text-center bg-white/5 rounded-2xl border border-dashed border-white/20 text-gray-500">
            <p className="text-sm">No active positions in your portfolio.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.keys(portfolio).map((symbol) => {
              try {
                const price = stockPrices[symbol + ".NS"] || stockPrices[symbol];
                const quantity = portfolio[symbol];
                const value =
                  typeof price === 'number' && typeof quantity === 'number'
                    ? (price * quantity).toLocaleString()
                    : '---';

                return (
                  <div key={symbol} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">
                    <div>
                      <p className="font-bold text-white uppercase">{symbol}</p>
                      <p className="text-xs text-gray-500 font-medium">{quantity} Units</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">₹ {value}</p>
                      {price && <p className="text-[10px] text-gray-500">@ ₹ {price.toLocaleString()}</p>}
                    </div>
                  </div>
                );
              } catch (error) {
                console.error(`Error rendering holdings for ${symbol}:`, error);
                return null;
              }
            })}

            <div className="bg-green-500/10 p-4 rounded-2xl border border-green-500/20 mt-6">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-green-400 uppercase">Portfolio Value</p>
                <p className="text-2xl font-black text-white">₹ {totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-2">History</h2>
        {transactions.length === 0 ? (
          <p className="text-center py-8 text-gray-600 italic text-sm">No transaction history found.</p>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 8).map((transaction, index) => {
              try {
                if (!transaction || typeof transaction !== 'object' || !transaction.stock_symbol) return null;

                const isBuy = transaction.type === 'buy';
                return (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${isBuy ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {isBuy ? 'B' : 'S'}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white uppercase">{transaction.stock_symbol}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-black">{transaction.quantity} @ ₹ {transaction.price_per_share?.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${isBuy ? 'text-red-400' : 'text-green-400'}`}>
                        {isBuy ? '-' : '+'}₹ {(transaction.total_cost || transaction.total_earnings || 0).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-600">{transaction.timestamp ? new Date(transaction.timestamp).toLocaleDateString() : 'Recent'}</p>
                    </div>
                  </div>
                );
              } catch (error) {
                return null;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;