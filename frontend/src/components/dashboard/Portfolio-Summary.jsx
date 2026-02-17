// import React,{useState,useEffect} from "react";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import axios from "axios";

// const data = [
//   { name: "Stocks", value: 45, color: "#0ea5e9" },
//   { name: "Bonds", value: 20, color: "#8b5cf6" },
//   { name: "Crypto", value: 15, color: "#f43f5e" },
//   { name: "Real Estate", value: 10, color: "#10b981" },
//   { name: "Gold", value: 5, color: "#f59e0b" },
//   { name: "Cash", value: 5, color: "#6b7280" },
// ];

// const PortfolioSummary = () => {

//     const [expenseCategories, setExpenseCategories] = useState([]);
//     const [monthlyTrends,setMonthlyTrends] = useState([]);
//     const [topExpenses, setTopExpenses] = useState([]);
//       const [categoryChanges, setCategoryChanges] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Color mapping for consistent colors across charts
//     const categoryColors = {
//       Stocks: "#06b6d4",
//       Bonds: "#14b8a6",
//       "Mutual Funds": "#8b5cf6",
//       "Real Estate": "#f97316",
//       Crypto: "#a3e635",
//       "Fixed Deposits": "#fb923c",
//       Gold: "#facc15",
//       EMI: "#ef4444",
//       Savings: "#22c55e",
//       Other: "#94a3b8",
//     };

//     useEffect(() => {
//       const fetchData = async () => {
//         setLoading(true);
//         try {
//           const token = sessionStorage.getItem("uid");
//           if (!token) {
//             console.error("No token found in sessionStorage");
//             setLoading(false);
//             return;
//           }

//           // Fetch all data
//           const monthlyResponse = await axios.get("http://localhost:5000/api/monthly-data", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           console.log("Monthly data:", monthlyResponse.data);
//           setMonthlyTrends(monthlyResponse.data);

//           const budgetResponse = await axios.get("http://localhost:5000/api/budget-progress", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           console.log("Budget progress data:", budgetResponse.data);
//           const categoriesData = budgetResponse.data.map((item) => ({
//             name: item.category,
//             value: item.spent,
//             color: categoryColors[item.category] || "#94a3b8",
//             percentage: ((item.spent / item.allocated) * 100).toFixed(1),
//           }));
//           setExpenseCategories(categoriesData);

//           const changesData = budgetResponse.data.map((item) => ({
//             category: item.category,
//             previousMonth: item.allocated * 0.9,
//             currentMonth: item.spent,
//             change: `${(((item.spent - item.allocated) / item.allocated) * 100).toFixed(1)}%`,
//           }));
//           setCategoryChanges(changesData);

//           const transactionsResponse = await axios.get("http://localhost:5000/api/recent-transactions", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           console.log("Recent transactions:", transactionsResponse.data);
//           setTopExpenses(transactionsResponse.data);

//           setLoading(false); // Set loading to false after all data is fetched
//         } catch (error) {
//           console.error("Error fetching data:", error);
//           setError("Failed to load data.");
//           setLoading(false); // Set loading to false even if there's an error
//         }
//       };

//       fetchData();
//     }, []);

//     if (loading) {
//       return (
//         <div className="flex justify-center items-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//             <p className="mt-4 text-gray-500">Loading your financial data...</p>
//           </div>
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
//           <p className="font-medium">Error</p>
//           <p>{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded text-sm"
//           >
//             Try Again
//           </button>
//         </div>
//       );
//     }
//   return (
//     <div className="w-full flex flex-col md:flex-row items-center justify-between">
//       <div className="flex justify-center mb-6">
//                <ResponsiveContainer width="100%" height={250}>
//                  <PieChart>
//                    <Pie
//                      data={expenseCategories}
//                      cx="50%"
//                      cy="50%"
//                      innerRadius={60}
//                      outerRadius={80}
//                      paddingAngle={2}
//                      dataKey="value"
//                      label={false}
//                    >
//                      {expenseCategories.map((entry, index) => (
//                        <Cell key={`cell-${index}`} fill={entry.color} />
//                      ))}
//                    </Pie>
//                  </PieChart>
//                </ResponsiveContainer>
//              </div>

//              <div className="grid grid-cols-2 gap-4">
//         <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
//         <div className="grid grid-cols-2 gap-4">
//           {data.map((item) => (
//             <div key={item.name} className="flex items-center gap-2">
//               <div style={{ backgroundColor: item.color, width: "10px", height: "10px", borderRadius: "50%" }}></div>
//               <div className="flex justify-between w-full">
//                 <span className="text-sm">{item.name}</span>
//                 <span className="text-sm font-medium">{item.value}%</span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm font-medium">Diversification Score</p>
//               <p className="text-xs text-gray-500">Your portfolio is well balanced</p>
//             </div>
//             <div className="text-2xl font-bold">8.5/10</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PortfolioSummary;

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";

const PortfolioSummary = () => {
  const [expenseCategories, setExpenseCategories] = useState([]);
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

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user_id = sessionStorage.getItem("uid");
        if (!user_id) {
          console.error("No user_id found in sessionStorage");
          setLoading(false);
          return;
        }

        // Fetch budget progress data with user_id in headers
        const response = await fetch("/api/budget-progress", {
          headers: { user_id: user_id, Authorization: `Bearer ${user_id}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const budgetData = await response.json();
        console.log("Budget data:", budgetData);
        // Process data for the pie chart
        const categoriesData = budgetData.map((item) => ({
          name: item.category,
          value: item.spent,
          color: categoryColors[item.category] || "#94a3b8",
          percentage: ((item.spent / item.allocated) * 100).toFixed(1),
        }));

        setExpenseCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
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

  // Error state
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
    <div className="w-full flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-lg shadow-md">
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <ResponsiveContainer width="100%" height={300}>
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

      {/* Asset Allocation Details */}
      <div className="w-full md:w-1/2 pl-6">
        <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenseCategories.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                style={{
                  backgroundColor: item.color,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              ></div>
              <div className="flex justify-between w-full">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Diversification Score */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Diversification Score</p>
              <p className="text-xs text-gray-500">
                Your portfolio is well balanced
              </p>
            </div>
            <div className="text-2xl font-bold">8.5/10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
