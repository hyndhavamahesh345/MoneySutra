

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import axios from "axios";

const ExpenseAnalytics = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [topExpenses, setTopExpenses] = useState([]);
  const [categoryChanges, setCategoryChanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Color mapping for consistent colors across charts
  const categoryColors = {
    Stocks: "#06b6d4",
    Bonds: "#14b8a6",
    "Mutual Funds": "#8b5cf6",
    "Real Estate": "#f97316",
    Crypto: "#a3e635",
    "Fixed Deposits": "#fb923c",
    Gold: "#facc15",
    EMI: "#ef4444",
    Savings: "#22c55e",
    Other: "#94a3b8",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("uid");
        if (!token) {
          console.error("No token found in sessionStorage");
          setLoading(false);
          return;
        }

        // Fetch all data
        const monthlyResponse = await axios.get("/api/monthly-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Monthly data:", monthlyResponse.data);
        setMonthlyTrends(monthlyResponse.data);

        const budgetResponse = await axios.get("/api/budget-progress", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Budget progress data:", budgetResponse.data);
        const categoriesData = budgetResponse.data.map((item) => ({
          name: item.category,
          value: item.spent,
          color: categoryColors[item.category] || "#94a3b8",
          percentage: ((item.spent / item.allocated) * 100).toFixed(1),
        }));
        setExpenseCategories(categoriesData);

        const changesData = budgetResponse.data.map((item) => ({
          category: item.category,
          previousMonth: item.allocated * 0.9,
          currentMonth: item.spent,
          change: `${(((item.spent - item.allocated) / item.allocated) * 100).toFixed(1)}%`,
        }));
        setCategoryChanges(changesData);

        const transactionsResponse = await axios.get("/api/recent-transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Recent transactions:", transactionsResponse.data);
        setTopExpenses(transactionsResponse.data);

        setLoading(false); // Set loading to false after all data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
        <p className="font-medium">Error</p>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-7">
      {/* Pie Chart Card */}
      <div className="bg-white p-6 rounded-lg shadow md:col-span-3">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Expense Breakdown</h2>
          <p className="text-sm text-gray-500">How your expenses are distributed across categories</p>
        </div>
        <div className="flex justify-center mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={false}
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {expenseCategories.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex justify-between w-full">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium">${item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart Card */}
      <div className="bg-white p-6 rounded-lg shadow md:col-span-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Monthly Expense Trends</h2>
          <p className="text-sm text-gray-500">How your spending has changed over time</p>
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-sm rounded ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            All Categories
          </button>
          <button
            onClick={() => setActiveTab("top")}
            className={`px-4 py-2 text-sm rounded ${activeTab === "top" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Top Expenses
          </button>
          <button
            onClick={() => setActiveTab("changes")}
            className={`px-4 py-2 text-sm rounded ${activeTab === "changes" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Monthly Changes
          </button>
        </div>

        {activeTab === "all" && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#22c55e" />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === "top" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Top Expenses This Month</h3>
            {topExpenses.map((expense, index) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-xs font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{expense.description}</div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">{expense.category}</span>
                      <span className="text-xs text-gray-500">{expense.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right font-medium">${parseFloat(expense.amount).toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "changes" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Month-to-Month Changes</h3>
            {categoryChanges.map((item) => (
              <div key={item.category} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div>
                  <div className="font-medium">{item.category}</div>
                  <div className="text-xs text-gray-500">
                    ${item.previousMonth.toFixed(2)} → ${item.currentMonth.toFixed(2)}
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full flex items-center ${
                    item.change.startsWith("-") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.change.startsWith("-") ? <ArrowDown className="h-3 w-3 mr-1" /> : <ArrowUp className="h-3 w-3 mr-1" />}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseAnalytics;