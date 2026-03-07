import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/papertrading/header';
import StockList from '@/components/papertrading/stocklist';
import StockChart from '@/components/papertrading/stockchart';
import TradingInterface from '@/components/papertrading/tradinginterface';
import Portfolio from '@/components/papertrading/portfolio';

const PaperTrading = () => {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [balance, setBalance] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [historicalData, setHistoricalData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);

  // Check if the user is logged in (userId exists in session storage)
  useEffect(() => {
    const storedUserId = sessionStorage.getItem('uid');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // demo user for preview
      setUserId("demo_user");
    }
  }, []);

  // Fetch user data (balance, portfolio, transactions) when userId is available
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          // Fetch balance
          const balanceResponse = await fetch(`/api/funds?uid=${userId}`);
          const balanceData = await balanceResponse.json();
          setBalance(balanceData.funds || 0);

          // Fetch portfolio (holdings)
          const holdingsResponse = await fetch(`/api/holdings?uid=${userId}`);
          const holdingsData = await holdingsResponse.json();
          setPortfolio(holdingsData.holdings || {});

          // Fetch transactions
          const transactionsResponse = await fetch(`/api/transactions?uid=${userId}`);
          const transactionsData = await transactionsResponse.json();
          setTransactions(transactionsData.transactions || []);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  // Fetch the list of tickers on component mount
  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch('/api/stocks');
        const data = await response.json();
        setStocks(data.tickers || []);
      } catch (error) {
        console.error('Error fetching tickers:', error);
      }
    };

    fetchTickers();
  }, []);

  // Fetch historical data when a stock is selected
  useEffect(() => {
    if (selectedStock) {
      const fetchHistoricalData = async () => {
        try {
          const response = await fetch('/api/stock/historical', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticker: selectedStock.symbol }),
          });
          const data = await response.json();
          if (data.file_content) {
            const decodedData = atob(data.file_content);
            setHistoricalData(decodedData);
          }
        } catch (error) {
          console.error('Error fetching historical data:', error);
        }
      };

      fetchHistoricalData();
    }
  }, [selectedStock]);

  // Handle buying or selling stocks
  const handleTrade = async (symbol, action, quantity, price) => {
    try {
      const response = await fetch(`/api/${action}_stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userId,
          stock_symbol: symbol,
          quantity: quantity,
          price_per_share: price,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setBalance(result.new_funds);
        const holdingsRes = await fetch(`/api/holdings?uid=${userId}`);
        const hData = await holdingsRes.json();
        setPortfolio(hData.holdings || {});
        const txRes = await fetch(`/api/transactions?uid=${userId}`);
        const txData = await txRes.json();
        setTransactions(txData.transactions || []);
      } else {
        alert(result.error || 'Trade failed');
      }
    } catch (error) {
      console.error('Error executing trade:', error);
    }
  };

  const addFunds = async (amount) => {
    try {
      const response = await fetch('/api/add_funds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: userId, amount: amount }),
      });
      const result = await response.json();
      if (response.ok) {
        setBalance(result.new_funds);
        return result;
      }
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Header balance={balance} onAddFunds={addFunds} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
              <StockChart stock={selectedStock} historicalData={historicalData} />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
              <TradingInterface
                stock={selectedStock}
                onTrade={handleTrade}
                balance={balance}
              />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
              <StockList stocks={stocks} onSelectStock={setSelectedStock} />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
              <Portfolio portfolio={portfolio} transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperTrading;