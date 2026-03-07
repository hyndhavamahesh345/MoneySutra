import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [livePricesLoaded, setLivePricesLoaded] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = sessionStorage.getItem("uid");

        if (!userId) {
          setTransactions([]);
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/transactions?uid=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const transactionsData = await response.json();

        if (
          !transactionsData ||
          !Array.isArray(transactionsData.transactions)
        ) {
          throw new Error("Invalid transactions data format");
        }

        console.log(transactionsData.transactions);
        setTransactions(transactionsData.transactions);
      } catch (err) {
        console.error("Transaction Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length === 0 || livePricesLoaded) return;

    const fetchLivePrices = async () => {
      try {
        const uniqueSymbols = [
          ...new Set(
            transactions
              .map((t) => t?.stock_symbol?.trim() + ".NS")
              .filter(Boolean)
          ),
        ];

        if (uniqueSymbols.length === 0) {
          console.warn("No valid stock symbols found for live price fetch.");
          setLivePricesLoaded(true);
          return;
        }

        const response = await fetch("/api/get_stock_prices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stock_symbols: uniqueSymbols }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch live stock prices");
        }

        const data = await response.json();
        const livePrices = data?.stock_prices || {};

        const updatedTransactions = transactions.map((transaction) => {
          const stockSymbol = transaction?.stock_symbol?.trim();
          const livePrice = livePrices[stockSymbol + ".NS"] || null;
          const pricePerShare = parseFloat(transaction?.price_per_share || 0);

          const changePercent =
            livePrice && pricePerShare
              ? (((livePrice - pricePerShare) / pricePerShare) * 100).toFixed(2)
              : "N/A";

          return {
            ...transaction,
            livePrice,
            changePercent,
          };
        });

        console.log(updatedTransactions);
        setTransactions(updatedTransactions);
      } catch (err) {
        console.error("Live Prices Fetch Error:", err);
      } finally {
        setLivePricesLoaded(true);
      }
    };

    fetchLivePrices();
  }, [transactions, livePricesLoaded]);

  if (loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Synchronizing transactions...</div>;

  const mappedTransactions = transactions.map((transaction) => ({
    id: transaction?.stock_symbol + transaction?.timestamp || "unknown",
    asset: transaction?.stock_symbol || "Unknown Asset",
    type: transaction?.type || "Unknown",
    amount: `Rs ${(transaction?.total_cost || 0).toFixed(2)}`,
    shares: (transaction?.quantity || 0).toFixed(2),
    date:
      transaction?.timestamp &&
        !isNaN(new Date(transaction.timestamp).getTime())
        ? new Date(transaction.timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        : "Invalid Date",
    status: "completed",
    change: `${transaction?.changePercent || "0.00"}%`,
    isPositive: parseFloat(transaction?.changePercent || "0") >= 0,
  }));

  if (mappedTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
        <Clock className="w-12 h-12 mb-4 text-gray-500" />
        <p className="text-gray-400">No recent transactions found.</p>
        <span className="text-xs">Your investment history will appear here.</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="pb-4 pt-1 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Asset</th>
            <th className="pb-4 pt-1 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Investment</th>
            <th className="pb-4 pt-1 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Change</th>
          </tr>
        </thead>
        <tbody className="space-y-4">
          {mappedTransactions.map((transaction) => (
            <tr key={transaction.id} className="group hover:bg-white/5 transition-colors">
              <td className="p-2 first:rounded-l-xl">
                <div className="flex flex-col">
                  <span className="font-bold text-white tracking-tight">{transaction.asset}</span>
                  <span
                    className={`inline-flex items-center mt-1 text-[10px] font-black uppercase tracking-widest ${transaction.type === "buy"
                      ? "text-green-500"
                      : "text-red-500"
                      }`}
                  >
                    {transaction.type}
                  </span>
                </div>
              </td>
              <td className="p-2 text-right">
                <div className="flex flex-col">
                  <span className="font-bold">{transaction.amount}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {transaction.shares} Qty
                  </span>
                </div>
              </td>
              <td
                className={`p-2 text-right font-black last:rounded-r-xl ${transaction.isPositive ? "text-green-500" : "text-red-500"
                  }`}
              >
                {transaction.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
