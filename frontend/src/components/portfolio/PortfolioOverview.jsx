import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer, 
  AreaChart, Area, CartesianGrid, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, TrendingUp, Zap, Shield } from "lucide-react";
import Overview from "./Overview";
import Investments from "./Investment";
import Budget from "./Budget";

const PortfolioOverview = () => {
  const [bonds, setBonds] = useState([]);
  const [mutualFunds, setMutualFunds] = useState([]);
  const [sips, setSips] = useState([]);
  const [budget, setBudget] = useState({});
  const [insights, setInsights] = useState([]);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = sessionStorage.getItem("uid");

  // Gemini API Key
  const apiKey = "AIzaSyCRjmh5VKcCnANplEe3Vloz7SmR3mEwtnA";

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchBonds(),
          fetchMutualFunds(),
          fetchSips(),
          fetchBudget()
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  const fetchBonds = async () => {
    try {
      const response = await fetch(`/api/savings/getbonds/${uid}`);
      if (!response.ok) throw new Error("Failed to fetch bonds");
      const data = await response.json();
      setBonds(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching bonds:", error);
    }
  };

  const fetchMutualFunds = async () => {
    try {
      const response = await fetch(`/api/savings/getmf/${uid}`);
      if (!response.ok) throw new Error("Failed to fetch mutual funds");
      const data = await response.json();
      setMutualFunds(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching mutual funds:", error);
    }
  };

  const fetchSips = async () => {
    try {
      const response = await fetch(`/api/savings/getsip/${uid}`);
      if (!response.ok) throw new Error("Failed to fetch SIPs");
      const data = await response.json();
      setSips(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching SIPs:", error);
    }
  };

  const fetchBudget = async () => {
    try {
      const response = await fetch("/api/budget/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: uid }),
      });
      if (!response.ok) throw new Error("Failed to fetch budget");
      const data = await response.json();
      setBudget(data);
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  // Generate Insights and Tips using Gemini API
  
const generateInsights = () => {
  setInsights([
    "Portfolio shows strong diversification across asset classes, reducing overall risk exposure.",
    "Mutual funds dominate the allocation, indicating a growth-oriented investment strategy.",
    "SIPs contribute to disciplined investing and long-term wealth creation."
  ]);

  setTips([
    "Rebalance the portfolio every quarter to maintain optimal asset allocation.",
    "Gradually increase equity exposure to improve long-term returns.",
    "Keep at least 6 months of expenses as liquid emergency savings."
  ]);
};




  // Data for graphs
  const prepareData = () => {
    // Asset Allocation Data
    const totalBonds = bonds.reduce((sum, bond) => sum + parseFloat(bond.amount || 0), 0);
    const totalMutualFunds = mutualFunds.reduce((sum, mf) => sum + parseFloat(mf.amount || 0), 0);
    const totalSips = sips.reduce((sum, sip) => sum + parseFloat(sip.amount || 0), 0);
    
    const assetAllocationData = [
      { name: "Bonds", value: totalBonds, color: "#4E79A7" },
      { name: "Mutual Funds", value: totalMutualFunds, color: "#F28E2B" },
      { name: "SIPs", value: totalSips, color: "#59A14F" }
    ];
    
    // Bond Types Distribution
    const bondTypesData = bonds.reduce((acc, bond) => {
      const type = bond.bondType || "Unknown";
      acc[type] = (acc[type] || 0) + parseFloat(bond.amount || 0);
      return acc;
    }, {});
    
    const bondTypesChartData = Object.entries(bondTypesData).map(([type, amount]) => ({
      name: type,
      value: amount
    }));
    
    // Mutual Fund Types Distribution
    const fundTypesData = mutualFunds.reduce((acc, fund) => {
      const type = fund.fundType || "Unknown";
      acc[type] = (acc[type] || 0) + parseFloat(fund.amount || 0);
      return acc;
    }, {});
    
    const fundTypesChartData = Object.entries(fundTypesData).map(([type, amount]) => ({
      name: type,
      value: amount
    }));
    
    // Budget Utilization Data
    const income = parseFloat(budget.income || 0);
    const savings = parseFloat(budget.savings || 0);
    const expenses = income - savings;
    
    const budgetUtilizationData = [
      { name: "Income", value: income, color: "#4E79A7" },
      { name: "Savings", value: savings, color: "#59A14F" },
      { name: "Expenses", value: expenses, color: "#E15759" }
    ];
    
    // Budget Allocation
    const budgetAllocationData = [
      { name: "Bonds", value: parseFloat(budget.bonds || 0), color: "#4E79A7" },
      { name: "Crypto", value: parseFloat(budget.crypto || 0), color: "#F28E2B" },
      { name: "Fixed Deposits", value: parseFloat(budget.fixedDeposits || 0), color: "#59A14F" },
      { name: "Gold", value: parseFloat(budget.gold || 0), color: "#E15759" },
      { name: "Mutual Funds", value: parseFloat(budget.mutualFunds || 0), color: "#76B7B2" },
      { name: "Real Estate", value: parseFloat(budget.realEstate || 0), color: "#EDC948" },
      { name: "Stocks", value: parseFloat(budget.stocks || 0), color: "#B07AA1" }
    ].filter(item => item.value > 0);
    
    // Investment Distribution for Radar Chart
    const investmentRadarData = [
      { subject: "Bonds", A: totalBonds, fullMark: Math.max(totalBonds, totalMutualFunds, totalSips) * 1.2 },
      { subject: "Mutual Funds", A: totalMutualFunds, fullMark: Math.max(totalBonds, totalMutualFunds, totalSips) * 1.2 },
      { subject: "SIPs", A: totalSips, fullMark: Math.max(totalBonds, totalMutualFunds, totalSips) * 1.2 },
      { subject: "Stocks", A: parseFloat(budget.stocks || 0), fullMark: Math.max(totalBonds, totalMutualFunds, totalSips) * 1.2 },
      { subject: "Gold", A: parseFloat(budget.gold || 0), fullMark: Math.max(totalBonds, totalMutualFunds, totalSips) * 1.2 },
      { subject: "Real Estate", A: parseFloat(budget.realEstate || 0), fullMark: Math.max(totalBonds, totalMutualFunds, totalSips) * 1.2 }
    ];
    
    return {
      assetAllocationData,
      bondTypesChartData,
      fundTypesChartData,
      budgetUtilizationData,
      budgetAllocationData,
      investmentRadarData,
      totalPortfolioValue: totalBonds + totalMutualFunds + totalSips
    };
  };
  
  const { 
    assetAllocationData, 
    bondTypesChartData, 
    fundTypesChartData, 
    budgetUtilizationData, 
    budgetAllocationData,
    investmentRadarData,
    totalPortfolioValue
  } = prepareData();
  
  // For pie charts
  const COLORS = ["#4E79A7", "#F28E2B", "#59A14F", "#E15759", "#76B7B2", "#EDC948", "#B07AA1", "#FF9DA7"];
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="font-semibold">{`${label || payload[0].name}`}</p>
          <p className="text-sm">{`Amount: ₹${payload[0].value.toFixed(2)}`}</p>
          {payload[0].payload.percentage && (
            <p className="text-sm">{`Percentage: ${payload[0].payload.percentage.toFixed(2)}%`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom PieChart label
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium">Loading portfolio data...</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header with Total Portfolio Value */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 shadow-lg text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
            <p className="text-blue-100">Financial summary and insights</p>
          </div>
          <div className="mt-4 md:mt-0 text-center">
            <p className="text-sm uppercase tracking-wider text-blue-100">Total Portfolio Value</p>
            <h2 className="text-4xl font-bold">₹{totalPortfolioValue.toFixed(2)}</h2>
          </div>
        </div>
      </div>
  
      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Overview 
            bonds={bonds} 
            mutualFunds={mutualFunds} 
            sips={sips} 
            assetAllocationData={assetAllocationData} 
            investmentRadarData={investmentRadarData} 
            generateInsights={generateInsights} 
            insights={insights} 
            tips={tips}
          />
        </TabsContent>
        
        {/* Investments Tab */}
        <TabsContent value="investments" className="space-y-6">
          <Investments 
            bonds={bonds} 
            mutualFunds={mutualFunds} 
            sips={sips} 
            fundTypesChartData={fundTypesChartData}
          />
        </TabsContent>
        
        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <Budget 
            budget={budget} 
            budgetUtilizationData={budgetUtilizationData} 
            budgetAllocationData={budgetAllocationData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PortfolioOverview;