

import React, { useState,useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BudgetOverview from "../../components/budget/BudgetOverview";
import MonthlyBudgetForm from "../../components/budget/MonthlyBudgetForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, PiggyBank, TrendingDown, BarChart3 } from "lucide-react";
import ExpenseAnalytics from './../../components/budget/ExpenseCategories';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Enhanced expense form component as a modal
const AddExpenseForm = ({ onClose }) => {
  // Default investment values
  const defaultInvestments = {
    stocks: 1000,
    bonds: 500,
    mutualFunds: 500,
    realEstate: 1000,
    crypto: 1000,
    fixedDeposits: 100,
    gold: 100,
    emi: 0,
    savings: 1390,
  };

  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    category: "",
    // Add the investment values to the form data
    ...defaultInvestments
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = sessionStorage.getItem("uid");
      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      const response = await fetch("/api/expense/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add expense");
      }

      alert("Investment data added successfully!");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding investment data:", error);
      alert("Failed to add investment data. Please try again.");
    }
  };

  const handleInvestmentChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: parseFloat(value) || 0
    });
  };

  // Calculate total investments
  const totalInvestment = Object.entries(formData)
    .filter(([key]) => Object.keys(defaultInvestments).includes(key))
    .reduce((sum, [_, value]) => sum + (parseFloat(value) || 0), 0);
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <Card className="w-full max-w-2xl bg-white shadow-xl rounded-xl" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
          <CardTitle className="text-2xl font-bold">Investment Tracker</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="investments">Investment Allocation</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Enter description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="amount" className="text-sm font-medium">Total Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">Primary Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Stocks">Stocks</SelectItem>
                        <SelectItem value="Bonds">Bonds</SelectItem>
                        <SelectItem value="Mutual Funds">Mutual Funds</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Crypto">Crypto</SelectItem>
                        <SelectItem value="Fixed Deposits">Fixed Deposits</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="EMI">EMI</SelectItem>
                        <SelectItem value="Savings">Savings</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="investments" className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                  <p className="text-sm text-blue-700 font-medium">Total Allocation: Rs.{totalInvestment.toFixed(2)}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stocks" className="text-sm font-medium">Stocks</Label>
                    <Input
                      id="stocks"
                      type="number"
                      value={formData.stocks}
                      onChange={(e) => handleInvestmentChange("stocks", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bonds" className="text-sm font-medium">Bonds</Label>
                    <Input
                      id="bonds"
                      type="number"
                      value={formData.bonds}
                      onChange={(e) => handleInvestmentChange("bonds", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mutualFunds" className="text-sm font-medium">Mutual Funds</Label>
                    <Input
                      id="mutualFunds"
                      type="number"
                      value={formData.mutualFunds}
                      onChange={(e) => handleInvestmentChange("mutualFunds", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="realEstate" className="text-sm font-medium">Real Estate</Label>
                    <Input
                      id="realEstate"
                      type="number"
                      value={formData.realEstate}
                      onChange={(e) => handleInvestmentChange("realEstate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="crypto" className="text-sm font-medium">Crypto</Label>
                    <Input
                      id="crypto"
                      type="number"
                      value={formData.crypto}
                      onChange={(e) => handleInvestmentChange("crypto", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fixedDeposits" className="text-sm font-medium">Fixed Deposits</Label>
                    <Input
                      id="fixedDeposits"
                      type="number"
                      value={formData.fixedDeposits}
                      onChange={(e) => handleInvestmentChange("fixedDeposits", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="gold" className="text-sm font-medium">Gold</Label>
                    <Input
                      id="gold"
                      type="number"
                      value={formData.gold}
                      onChange={(e) => handleInvestmentChange("gold", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emi" className="text-sm font-medium">EMI</Label>
                    <Input
                      id="emi"
                      type="number"
                      value={formData.emi}
                      onChange={(e) => handleInvestmentChange("emi", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="savings" className="text-sm font-medium">Savings</Label>
                    <Input
                      id="savings"
                      type="number"
                      value={formData.savings}
                      onChange={(e) => handleInvestmentChange("savings", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                <Button type="button" variant="outline" onClick={onClose} className="px-4">
                  Cancel
                </Button>
                <Button type="submit" className="px-4 bg-blue-600 hover:bg-blue-700">
                  Save
                </Button>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const BudgetPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [monthlyData, setMonthlyData] = useState({
      income: 0,
      expenses: 0,
      savings: 0,
    });
  
    // Fetch monthly data from the backend
    useEffect(() => {
      const fetchMonthlyData = async () => {
        const token = sessionStorage.getItem("uid");
        if (!token) return;
  
        try {
          const response = await fetch("/api/monthly-data", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (data.length > 0) {
            const latestMonth = data[data.length - 1];
            setMonthlyData({
              income: latestMonth.income,
              expenses: latestMonth.expenses,
              savings: latestMonth.income - latestMonth.expenses,
            });
          }
        } catch (error) {
          console.error("Error fetching monthly data:", error);
        }
      };
  
      fetchMonthlyData();
    }, []);
  
    // Function to export data as CSV
    const handleExportData = async () => {
      const token = sessionStorage.getItem("uid");
      if (!token) return;
  
      try {
        const response = await fetch("/api/monthly-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
  
        // Convert data to CSV
        const csvContent = "data:text/csv;charset=utf-8," +
          data.map(row => Object.values(row).join(",")).join("\n");
  
        // Create a download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "budget_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error exporting data:", error);
      }
    };
  
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget & Expenses</h1>
          <p className="text-muted-foreground">Manage your monthly budget and track expenses</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
        <Button variant="outline" onClick={handleExportData}>Export Data</Button>
          <Button onClick={() => setIsModalOpen(true)}>Add Expense</Button>
          {/* Modal will be rendered conditionally based on state */}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {[
          {
            title: "Monthly Income",
            amount: `Rs. ${monthlyData.income.toLocaleString()}`,
            change: "↑ 8.2%",
            changeColor: "text-emerald-500",
            icon: <Wallet className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Monthly Expenses",
            amount: `Rs. ${monthlyData.expenses.toLocaleString()}`,
            change: "↑ 2.5%",
            changeColor: "text-rose-500",
            icon: <TrendingDown className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Savings",
            amount: `Rs. ${monthlyData.savings.toLocaleString()}`,
            change: `${((monthlyData.savings / monthlyData.income) * 100).toFixed(1)}% of income`,
            changeColor: "text-muted-foreground",
            icon: <PiggyBank className="h-4 w-4 text-muted-foreground" />,
          },
        ].map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.amount}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${card.changeColor} font-medium`}>{card.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Budget Overview</TabsTrigger>
          <TabsTrigger value="categories">Expense Categories</TabsTrigger>
          <TabsTrigger value="settings">Budget Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <BudgetOverview />
        </TabsContent>
        <TabsContent value="categories">
          <ExpenseAnalytics />
        </TabsContent>
        <TabsContent value="settings">
          <MonthlyBudgetForm />
        </TabsContent>
      </Tabs>
      
      {/* Render the modal conditionally */}
      {isModalOpen && <AddExpenseForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default BudgetPage;