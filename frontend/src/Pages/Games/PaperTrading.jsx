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
    if (!storedUserId) {
      navigate('/login');
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  // Fetch user data (balance, portfolio, transactions) when userId is available
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          // Fetch balance
          const balanceResponse = await fetch(`/api/funds?uid=${userId}`);
          const balanceData = await balanceResponse.json();
          setBalance(balanceData.funds);

          // Fetch portfolio (holdings)
          const holdingsResponse = await fetch(`/api/holdings?uid=${userId}`);
          const holdingsData = await holdingsResponse.json();
          setPortfolio(holdingsData.holdings);

          // Fetch transactions
          const transactionsResponse = await fetch(`/api/transactions?uid=${userId}`);
          const transactionsData = await transactionsResponse.json();
          setTransactions(transactionsData.transactions);
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
        setStocks(data.tickers);
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
    console.log('Executing trade:', action, symbol, quantity, price);
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

        const holdingsResponse = await fetch(`/api/holdings?uid=${userId}`);
        const holdingsData = await holdingsResponse.json();
        setPortfolio(holdingsData.holdings);
        console.log(holdingsData.holdings);
        const transactionsResponse = await fetch(`/api/transactions?uid=${userId}`);
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData.transactions);
        console.log(transactionsData.transactions);
      } else {
        alert(result.error || 'Trade failed');
      }
    } catch (error) {
      console.error('Error executing trade:', error);
    }
  };

  // Function to add funds
  const addFunds = async (amount) => {
    try {
      const response = await fetch('/api/add_funds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userId,
          amount: amount,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setBalance(result.new_funds); // Update balance in state
        return result;
      } else {
        alert(result.error || 'Failed to add funds');
      }
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  // If userId is not available, don't render the component
  if (!userId) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto p-4">
      <Header balance={balance} onAddFunds={addFunds} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <StockChart stock={selectedStock} historicalData={historicalData} />
          <TradingInterface
            stock={selectedStock}
            onTrade={handleTrade}
            balance={balance}
          />
        </div>
        <div className="lg:col-span-1">
          <StockList stocks={stocks} onSelectStock={setSelectedStock} />
          <Portfolio portfolio={portfolio} transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default PaperTrading;