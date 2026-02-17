import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, FileText, Printer } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ArrowDown, ArrowUp } from "lucide-react";
import Recommendation from './Recommendation';

const profitLossData = [
  { date: "2025-01-01", value: 20000 },
  { date: "2025-01-15", value: 10500 },
  { date: "2025-02-01", value: 21200 },
  { date: "2025-02-15", value: 20500 },
  { date: "2025-03-01", value: 15800 },
  { date: "2025-03-15", value: 24685 },
];

export function ProfitLossReport() {
  const [transactionTab, setTransactionTab] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [originaltransactions, setOriginalTransactions] = useState([]);
  const [assetPerformance, setAssetPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Get UID from sessionStorage
        const userId = sessionStorage.getItem("uid");

        if (!userId) {
          throw new Error("User ID not found in sessionStorage");
        }

        // Fetch transactions from the API
        const transactionsResponse = await fetch(`/api/transactions?uid=${userId}`);
        if (!transactionsResponse.ok) {
          throw new Error("Failed to fetch transactions");
        }


        const transactionsData = await transactionsResponse.json();
        setOriginalTransactions(transactionsData.transactions);
        setTransactions(transactionsData.transactions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Fetch live stock prices for all unique tickers in transactions
  useEffect(() => {
    if (transactions.length === 0) return;

    const fetchLivePrices = async () => {
      try {
        // Extract unique stock symbols from transactions
        const uniqueSymbols = [
          ...new Set(transactions.map((t) => t.stock_symbol + ".NS")),
        ];

        // Fetch live stock prices
        const response = await fetch("/api/get_stock_prices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stock_symbols: uniqueSymbols }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch live stock prices");
        }

        const data = await response.json();
        const livePrices = data.stock_prices;

        // Update transactions with live price and percentage change
        const updatedTransactions = transactions.map((transaction) => {
          const livePrice = livePrices[transaction.stock_symbol + ".NS"];
          const changePercent = livePrice
            ? (
                ((livePrice - transaction.price_per_share) /
                  transaction.price_per_share) *
                100
              ).toFixed(2)
            : "N/A";

          return {
            ...transaction,
            livePrice,
            changePercent,
          };
        });

        setTransactions(updatedTransactions);

        // Calculate asset performance
        const assetMap = {};
        updatedTransactions.forEach((transaction) => {
          const symbol = transaction.stock_symbol;
          if (!assetMap[symbol]) {
            assetMap[symbol] = {
              symbol,
              initialValue: transaction.price_per_share * transaction.quantity,
              currentValue: transaction.livePrice * transaction.quantity,
              quantity: transaction.quantity,
            };
          } else {
            assetMap[symbol].initialValue += transaction.price_per_share * transaction.quantity;
            assetMap[symbol].currentValue += transaction.livePrice * transaction.quantity;
            assetMap[symbol].quantity += transaction.quantity;
          }
        });

        const assetPerformanceData = Object.values(assetMap).map((asset) => ({
          id: asset.symbol,
          symbol: asset.symbol,
          initialValue: asset.initialValue,
          currentValue: asset.currentValue,
          profit: asset.currentValue - asset.initialValue,
          change: ((asset.currentValue - asset.initialValue) / asset.initialValue * 100).toFixed(2) + "%",
        }));
        setAssetPerformance(assetPerformanceData);
      } catch (err) {
        console.error("Error fetching live stock prices:", err);
      }
    };

    fetchLivePrices();
  }, [transactions]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="font-bold">${payload[0].value.toLocaleString()}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-4 md:grid-cols-7">
      {/* Portfolio Value Over Time Card */}
      <Card className="md:col-span-7">
        <CardHeader>
          <CardTitle>Portfolio Value Over Time</CardTitle>
          <CardDescription>Track your investment growth for Q1 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitLossData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Recommendation transactions={originaltransactions}/>

      {/* Asset Performance Card */}
      <Card className="md:col-span-7">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Asset Performance</CardTitle>
            <CardDescription>Individual performance of each asset in your portfolio</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              CSV
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Initial Value</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Profit/Loss</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetPerformance.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.symbol}</TableCell>
                  <TableCell>Rs {asset.initialValue.toFixed(2)}</TableCell>
                  <TableCell>Rs {asset.currentValue.toFixed(2)}</TableCell>
                  <TableCell className={asset.profit >= 0 ? "text-emerald-500" : "text-rose-500"}>
                    {asset.profit >= 0 ? "+" : ""}Rs {asset.profit.toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${asset.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"
                      }`}
                  >
                    {asset.change}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transaction History Card */}
      <Card className="md:col-span-7">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Record of all your investment transactions for Q1 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setTransactionTab}>
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="buy">Buy Orders</TabsTrigger>
              <TabsTrigger value="sell">Sell Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>no. of shares</TableHead>
                    {/* <TableHead>Shares</TableHead> */}
                    <TableHead className="text-right">Price Per Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.timestamp).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={transaction.type === "buy" ? "outline" : "secondary"}
                          className={transaction.type === "buy" ? "text-emerald-500" : "text-rose-500"}
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.stock_symbol}</TableCell>
                      {/* <TableCell>Rs {transaction.total_cost.toFixed(2)}</TableCell> */}
                      <TableCell>{transaction.quantity.toFixed(2)}</TableCell>
                      <TableCell className="text-right">Rs {transaction.price_per_share.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

  
    </div>
  );
}