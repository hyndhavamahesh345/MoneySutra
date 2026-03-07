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
    <header className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white">Paper Trading</h1>
          <p className="text-gray-400 font-light">Practice with virtual capital in real markets.</p>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Virtual Balance</p>
            <p className="text-3xl font-black text-green-400">₹ {balance.toLocaleString()}</p>
          </div>

          <form onSubmit={handleAddFunds} className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-white w-24 px-2"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded-xl transition-all"
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