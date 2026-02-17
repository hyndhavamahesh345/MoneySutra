import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

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
          throw new Error("User ID not found in sessionStorage");
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

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

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

  return (
    <table className="w-full border-collapse border border-gray-300 text-left">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 border border-gray-300">Asset</th>
          <th className="p-3 border border-gray-300">Total Investment</th>
          <th className="p-3 border border-gray-300">Date</th>
          <th className="p-3 border border-gray-300 text-right">Change</th>
        </tr>
      </thead>
      <tbody>
        {mappedTransactions.map((transaction) => (
          <tr key={transaction.id} className="border border-gray-300">
            <td className="p-3 border border-gray-300 font-medium">
              <div className="flex flex-col">
                {transaction.asset}
                <span
                  className={`inline-flex items-center mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                    transaction.type === "buy"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type === "buy" ? (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  )}
                  {transaction.type}
                </span>
              </div>
            </td>
            <td className="p-3 border border-gray-300">
              <div className="flex flex-col">
                {transaction.amount}
                <span className="text-xs text-gray-500">
                  {transaction.shares}{" "}
                  {transaction.shares === "1.00" ? "share" : "shares"}
                </span>
              </div>
            </td>
            <td className="p-3 border border-gray-300">{transaction.date}</td>
            <td
              className={`p-3 border border-gray-300 text-right font-medium ${
                transaction.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {transaction.change}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentTransactions;
