import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const Header = ({ balance, onAddFunds }) => {
  const [amount, setAmount] = useState();

  const handleAddFunds = async (e) => {
    e.preventDefault();
    if (amount && !isNaN(amount)) {
      await onAddFunds(parseFloat(amount));
      setAmount(0);
    } else {
      alert('Please enter a valid amount.');
    }
  };

  return (
    <header className="bg-white shadow-sm p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Paper Trading Demo</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-gray-600" />
            <span className="text-lg font-medium text-gray-900">${balance.toLocaleString()}</span>
          </div>
          <form onSubmit={handleAddFunds} className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Funds
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;