"use client";

import { useState,useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { AlertCircle, Info, Save } from "lucide-react";

const initialBudget = {
 
  income: 10000,
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

const COLORS = {
  housing: "#0ea5e9",
  food: "#8b5cf6",
  transportation: "#f43f5e",
  utilities: "#10b981",
  entertainment: "#f59e0b",
  healthcare: "#6366f1",
  shopping: "#ec4899",
  stocks: "#34c759",
  bonds: "#a855f7",
  mutualFunds: "#f97316",
  realEstate: "#4f46e5",
  crypto: "#f7d2c4",
  fixedDeposits: "#8f0a1a",
  gold: "#ffd700",
  emi: "#3b82f6",
  savings: "#6b7280",
};

export default function MonthlyBudgetForm() {
  const [budget, setBudget] = useState(initialBudget);
  const [autoSave, setAutoSave] = useState(true);

  const totalExpenses = Object.entries(budget)
    .filter(([key]) => key !== "income" && key !== "savings")
    .reduce((sum, [_, value]) => sum + value, 0);

  const remainingForSavings = budget.income - totalExpenses;
  const savingsPercentage = Math.round((remainingForSavings / budget.income) * 100);

  // const handleBudgetChange = (category, value) => {
  //   setBudget((prev) => ({
  //     ...prev,
  //     [category]: value,
  //     savings: category === "savings" ? value : remainingForSavings,
  //   }));
  // };

  // Fetch budget data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const userId = sessionStorage.getItem('uid');
      if (userId) {
        await fetchBudget(new Date().toLocaleString('default', { year: 'numeric', month: '2-digit' }));
      }
    };
    fetchData();
  }, []);
  const handleBudgetChange = (category, value) => {
    setBudget((prev) => {
      const updatedBudget = {
        ...prev,
        [category]: value,
      };
  
      // Recalculate savings
      const totalExpenses = Object.entries(updatedBudget)
        .filter(([key]) => key !== "income" && key !== "savings")
        .reduce((sum, [_, value]) => sum + value, 0);
  
      updatedBudget.savings = updatedBudget.income - totalExpenses;
  
      return updatedBudget;
    });
  };

  const saveBudget = async () => {
    try {
      const userId = sessionStorage.getItem('uid');
  
      if (!userId) {
        console.error("User ID not found in session storage.");
        return;
      }
  
      const now = new Date();
      const timestamp = now.toISOString(); // ISO format for Firestore
      const month_year = now.toLocaleString('default', { year: 'numeric', month: '2-digit' }); // Format: "2023-10"
  
      const budgetData = {
        userId: userId,
        income: budget.income,
        stocks: budget.stocks,
        bonds: budget.bonds,
        mutualFunds: budget.mutualFunds,
        realEstate: budget.realEstate,
        crypto: budget.crypto,
        fixedDeposits: budget.fixedDeposits,
        gold: budget.gold,
        emi: budget.emi,
        savings: remainingForSavings,
        timestamp: timestamp, // Add timestamp
        month_year: month_year // Add month_year
      };
      console.log(budgetData);
  
      const response = await fetch('/api/budget/create', { // Use /api/budget/create
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData)
      });
  
      console.log(response);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save budget');
      }
  
      console.log('Budget saved successfully');
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };



// const fetchBudget = async () => {
//   try {
//       const userId = sessionStorage.getItem('userId');

//       if (!userId) {
//           console.error("User ID not found in session storage.");
//           return; // Or handle the missing userId appropriately
//       }

//       const requestData = { userId: userId };  // Send userId in the body

//       const response = await fetch('http://localhost:5000/budget/get', {  // Replace with your Flask server URL
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestData)  // Send it as JSON
//       });

//       if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || 'Failed to fetch budget');
//       }

//       const budgetData = await response.json();
//       setBudget(budgetData); // Update the budget state with fetched data
//       console.log('Budget fetched successfully:', budgetData);

//   } catch (error) {
//       console.error("Error fetching budget:", error);
//   }
// };
const fetchBudget = async (monthYear) => {
  try {
    const userId = sessionStorage.getItem('uid');

    if (!userId) {
      console.error("User ID not found in session storage.");
      return;
    }

    const requestData = { userId: userId, month_year: monthYear }; // Include month_year in the request

    const response = await fetch('/api/budget/get', { // Use /api/budget/get
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch budget');
    }

    const budgetData = await response.json();
    setBudget(budgetData); // Update the budget state with fetched data
    console.log('Budget fetched successfully:', budgetData);

  } catch (error) {
    console.error("Error fetching budget:", error);
  }
};


// const updateBudget = async () => {
//   try {
//       const userId = sessionStorage.getItem('userId');

//       if (!userId) {
//           console.error("User ID not found in session storage.");
//           return; // Or handle the missing userId appropriately
//       }

//       const budgetData = {
//           userId: userId,  // Include userId in the body
//           income: budget.income,
//           stocks: budget.stocks,
//           bonds: budget.bonds,
//           mutualFunds: budget.mutualFunds,
//           realEstate: budget.realEstate,
//           crypto: budget.crypto,
//           fixedDeposits: budget.fixedDeposits,
//           gold: budget.gold,
//           emi: budget.emi,
//           savings: remainingForSavings
//       };

//       const response = await fetch('api/budget/update', {  // Replace with your Flask server URL
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(budgetData)
//       });

//       if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || 'Failed to update budget');
//       }

//       console.log('Budget updated successfully');
//   } catch (error) {
//       console.error("Error updating budget:", error);
//   }
// };
const updateBudget = async () => {
  try {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
      console.error("User ID not found in session storage.");
      return;
    }

    const now = new Date();
    const timestamp = now.toISOString(); // ISO format for Firestore
    const month_year = now.toLocaleString('default', { year: 'numeric', month: '2-digit' }); // Format: "2023-10"

    const budgetData = {
      userId: userId,
      income: budget.income,
      stocks: budget.stocks,
      bonds: budget.bonds,
      mutualFunds: budget.mutualFunds,
      realEstate: budget.realEstate,
      crypto: budget.crypto,
      fixedDeposits: budget.fixedDeposits,
      gold: budget.gold,
      emi: budget.emi,
      savings: remainingForSavings,
      timestamp: timestamp, // Add timestamp
      month_year: month_year // Add month_year
    };

    const response = await fetch('api/budget/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(budgetData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update budget');
    }

    console.log('Budget updated successfully');
  } catch (error) {
    console.error("Error updating budget:", error);
  }
};

  const pieData = [
   
    { name: "Stocks", value: budget.stocks, color: COLORS.stocks },
    { name: "Bonds", value: budget.bonds, color: COLORS.bonds },
    { name: "Mutual Funds", value: budget.mutualFunds, color: COLORS.mutualFunds },
    { name: "Real Estate", value: budget.realEstate, color: COLORS.realEstate },
    { name: "Cryptocurrency", value: budget.crypto, color: COLORS.crypto },
    { name: "Fixed Deposits", value: budget.fixedDeposits, color: COLORS.fixedDeposits },
    { name: "Gold & Commodities", value: budget.gold, color: COLORS.gold },
    { name: "EMI Payments", value: budget.emi, color: COLORS.emi },
    { name: "Savings", value: remainingForSavings, color: COLORS.savings },
  ];

  // Filter out zero-value items for better presentation
  const filteredPieData = pieData.filter((item) => item.value > 0);

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = Math.round((data.value / budget.income) * 100);
      return (
        <div className="bg-background p-2 border rounded shadow-lg">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
            <span className="font-medium">{data.name}</span>
          </div>
          <div className="mt-1 font-bold">${data.value}</div>
          <div className="mt-1 text-xs">{percentage}% of income</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-4 md:grid-cols-7">
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>Monthly Budget Settings</CardTitle>
          <CardDescription>Set your monthly income and expense limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="income">Monthly Income</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">$</span>
              <Input
                id="income"
                type="number"
                value={budget.income}
                onChange={(e) => handleBudgetChange("income", Number.parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Expense Categories</h3>
           

           

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="stocks">Stocks</Label>
                <span className="text-sm font-medium">${budget.stocks}</span>
              </div>
              <Slider
                id="stocks"
                min={0}
                max={budget.income}
                step={50}
                value={[budget.stocks]}
                onValueChange={(value) => handleBudgetChange("stocks", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="bonds">Bonds</Label>
                <span className="text-sm font-medium">${budget.bonds}</span>
              </div>
              <Slider
                id="bonds"
                min={0}
                max={budget.income}
                step={50}
                value={[budget.bonds]}
                onValueChange={(value) => handleBudgetChange("bonds", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="mutualFunds">Mutual Funds</Label>
                <span className="text-sm font-medium">${budget.mutualFunds}</span>
              </div>
              <Slider
                id="mutualFunds"
                min={0}
                max={budget.income}
                step={50}
                value={[budget.mutualFunds]}
                onValueChange={(value) => handleBudgetChange("mutualFunds", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="realEstate">Real Estate</Label>
                <span className="text-sm font-medium">${budget.realEstate}</span>
              </div>
              <Slider
                id="realEstate"
                min={0}
                max={budget.income}
                step={50}
                value={[budget.realEstate]}
                onValueChange={(value) => handleBudgetChange("realEstate", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="crypto">Cryptocurrency</Label>
                <span className="text-sm font-medium">${budget.crypto}</span>
              </div>
              <Slider
                id="crypto"
                min={0}
                max={budget.income}
                step={50}
                value={[budget.crypto]}
                onValueChange={(value) => handleBudgetChange("crypto", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="fixedDeposits">Fixed Deposits</Label>
                <span className="text-sm font-medium">${budget.fixedDeposits}</span>
              </div>
              <Slider
                id="fixedDeposits"
                min={0}
                max={budget.income}
                step={50}
                value={[budget.fixedDeposits]}
                onValueChange={(value) => handleBudgetChange("fixedDeposits", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="gold">Gold & Commodities</Label>
                <span className="text-sm font-medium">${budget.gold}</span>
              </div>
              <Slider
                id="gold"
                min={0}
                max={budget.income}
                step={50}
                value={[budget.gold]}
                onValueChange={(value) => handleBudgetChange("gold", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="emi">EMI Payments</Label>
                <span className="text-sm font-medium">${budget.emi}</span>
              </div>
              <Slider
                id="emi"
                min={0}
                max={budget.income}
                step={50}
                value={[budget.emi]}
                onValueChange={(value) => handleBudgetChange("emi", value[0])}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Remaining for Savings</p>
                <p className="text-xs text-muted-foreground">{savingsPercentage}% of your income</p>
              </div>
            </div>
            <div className="text-xl font-bold">${remainingForSavings}</div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
            <Label htmlFor="auto-save">Automatically allocate remaining funds to savings</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setBudget(initialBudget)}>Reset to Default</Button>
          <Button onClick={saveBudget}> {/* Added onClick handler */}
            <Save className="mr-2 h-4 w-4" />
            Save Budget
          </Button>
        </CardFooter>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Budget Allocation</CardTitle>
          <CardDescription>Visual breakdown of your budget</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="pt-4">
              <div className="flex justify-center mb-6">
                <div style={{ width: 250, height: 250 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={filteredPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {filteredPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="list" className="pt-4">
  <div className="space-y-3">
    {pieData.map((item) => (
      <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="text-sm">{item.name}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-medium">${item.value}</span>
          <span className="text-xs text-muted-foreground">
            {Math.round((item.value / budget.income) * 100)}%
          </span>
        </div>
      </div>
    ))}
  </div>
</TabsContent>
          </Tabs>

          <div className="mt-6 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Budget Recommendations</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>Aim to save at least 20% of your income</li>
                <li>Housing costs should ideally be below 30% of income</li>
                <li>Consider the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
