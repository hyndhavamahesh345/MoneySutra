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
      const price = stockPrices[symbol+".NS"];
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
    <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
      <h2 className="text-xl font-bold mb-4">Portfolio</h2>

      {/* Display portfolio holdings */}
      {Object.keys(portfolio).length === 0 ? (
        <p className="text-gray-500">Your portfolio is empty.</p>
      ) : (
        <div>
          {Object.keys(portfolio).map((symbol) => {
            try {
              const price = stockPrices[symbol+".NS"];
              const quantity = portfolio[symbol];
              const value =
                typeof price === 'number' && typeof quantity === 'number'
                  ? (price * quantity).toFixed(2)
                  : 'N/A';

              return (
                <div key={symbol} className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium">{symbol}</p>
                    <p className="text-sm text-gray-500">{quantity} shares</p>
                  </div>
                  <p className="font-medium">${value}</p>
                </div>
              );
            } catch (error) {
              console.error(`Error rendering holdings for ${symbol}:`, error);
              return null; // Skip rendering this holding if an error occurs
            }
          })}

          {/* Display total portfolio value */}
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center">
              <p className="font-medium">Total Value</p>
              <p className="font-medium">${totalPortfolioValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Display recent transactions */}
      <h2 className="text-xl font-bold mt-6 mb-4">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <div>
          {transactions.slice(0, 5).map((transaction, index) => {
            try {
              if (
                !transaction ||
                typeof transaction !== 'object' ||
                !transaction.stock_symbol ||
                !transaction.quantity ||
                !transaction.price_per_share
              ) {
                return null; // Skip invalid transactions
              }

              return (
                <div key={index} className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.stock_symbol}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.quantity} shares at ${transaction.price_per_share.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">
                    {transaction.type === 'buy' ? '-' : '+'}$
                    {transaction.type === 'buy'
                      ? (transaction.total_cost || 0).toFixed(2)
                      : (transaction.total_earnings || 0).toFixed(2)}
                  </p>
                </div>
              );
            } catch (error) {
              console.error(`Error rendering transaction ${index}:`, error);
              return null; // Skip rendering this transaction if an error occurs
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Portfolio;