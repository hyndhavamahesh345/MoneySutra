// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const AddExpenseForm = ({ onClose }) => {
//   // Default investment values from your requirements
//   const defaultInvestments = {
//     stocks: 0,
//     bonds: 0,
//     mutualFunds: 0,
//     realEstate: 0,
//     crypto: 0,
//     fixedDeposits: 0,
//     gold: 0,
//     emi: 0,
//     savings: 0,
//   };

//   const [formData, setFormData] = useState({
//     description: "",
//     amount: 0,
//     date: new Date().toISOString().split("T")[0],
//     category: "",
//     // Add the investment values to the form data
//     ...defaultInvestments
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const userId = sessionStorage.getItem("uid");
//       if (!userId) {
//         alert("User ID not found. Please log in again.");
//         return;
//       }

//       const response = await fetch("/api/expense/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           userId: userId,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to add expense");
//       }

//       alert("Investment data added successfully!");
//       onClose(); // Close the modal
//     } catch (error) {
//       console.error("Error adding investment data:", error);
//       alert("Failed to add investment data. Please try again.");
//     }
//   };

//   const handleInvestmentChange = (key, value) => {
//     setFormData({
//       ...formData,
//       [key]: parseFloat(value) || 0
//     });
//   };

//   // Calculate total investments
//   const totalInvestment = Object.entries(formData)
//     .filter(([key]) => Object.keys(defaultInvestments).includes(key))
//     .reduce((sum, [_, value]) => sum + (parseFloat(value) || 0), 0);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
//       <Card className="w-full max-w-2xl bg-white shadow-xl rounded-xl">
//         <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
//           <CardTitle className="text-2xl font-bold">Investment Tracker</CardTitle>
//         </CardHeader>
        
//         <CardContent className="p-6">
//           <Tabs defaultValue="basic" className="w-full">
//             <TabsList className="grid grid-cols-2 mb-6">
//               <TabsTrigger value="basic">Basic Info</TabsTrigger>
//               <TabsTrigger value="investments">Investment Allocation</TabsTrigger>
//             </TabsList>
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <TabsContent value="basic" className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="description" className="text-sm font-medium">Description</Label>
//                     <Input
//                       id="description"
//                       type="text"
//                       placeholder="Enter description"
//                       value={formData.description}
//                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                       className="mt-1"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="amount" className="text-sm font-medium">Total Amount</Label>
//                     <Input
//                       id="amount"
//                       type="number"
//                       placeholder="Enter amount"
//                       value={formData.amount}
//                       onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
//                       className="mt-1"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="date" className="text-sm font-medium">Date</Label>
//                     <Input
//                       id="date"
//                       type="date"
//                       value={formData.date}
//                       onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                       className="mt-1"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="category" className="text-sm font-medium">Primary Category</Label>
//                     <Select
//                       value={formData.category}
//                       onValueChange={(value) => setFormData({ ...formData, category: value })}
//                     >
//                       <SelectTrigger className="mt-1">
//                         <SelectValue placeholder="Select category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Stocks">Stocks</SelectItem>
//                         <SelectItem value="Bonds">Bonds</SelectItem>
//                         <SelectItem value="Mutual Funds">Mutual Funds</SelectItem>
//                         <SelectItem value="Real Estate">Real Estate</SelectItem>
//                         <SelectItem value="Crypto">Crypto</SelectItem>
//                         <SelectItem value="Fixed Deposits">Fixed Deposits</SelectItem>
//                         <SelectItem value="Gold">Gold</SelectItem>
//                         <SelectItem value="EMI">EMI</SelectItem>
//                         <SelectItem value="Savings">Savings</SelectItem>
//                         <SelectItem value="Other">Other</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </TabsContent>
              
//               <TabsContent value="investments" className="space-y-6">
//                 <div className="p-4 bg-blue-50 rounded-lg mb-4">
//                   <p className="text-sm text-blue-700 font-medium">Total Allocation: ${totalInvestment.toFixed(2)}</p>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="stocks" className="text-sm font-medium">Stocks</Label>
//                     <Input
//                       id="stocks"
//                       type="number"
//                       value={formData.stocks}
//                       onChange={(e) => handleInvestmentChange("stocks", e.target.value)}
//                       className="mt-1"
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="bonds" className="text-sm font-medium">Bonds</Label>
//                     <Input
//                       id="bonds"
//                       type="number"
//                       value={formData.bonds}
//                       onChange={(e) => handleInvestmentChange("bonds", e.target.value)}
//                       className="mt-1"
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="mutualFunds" className="text-sm font-medium">Mutual Funds</Label>
//                     <Input
//                       id="mutualFunds"
//                       type="number"
//                       value={formData.mutualFunds}
//                       onChange={(e) => handleInvestmentChange("mutualFunds", e.target.value)}
//                       className="mt-1"
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="realEstate" className="text-sm font-medium">Real Estate</Label>
//                     <Input
//                       id="realEstate"
//                       type="number"
//                       value={formData.realEstate}
//                       onChange={(e) => handleInvestmentChange("realEstate", e.target.value)}
//                       className="mt-1"
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="crypto" className="text-sm font-medium">Crypto</Label>
//                     <Input
//                       id="crypto"
//                       type="number"
//                       value={formData.crypto}
//                       onChange={(e) => handleInvestmentChange("crypto", e.target.value)}
//                       className="mt-1"
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="fixedDeposits" className="text-sm font-medium">Fixed Deposits</Label>
//                     <Input
//                       id="fixedDeposits"
//                       type="number"
//                       value={formData.fixedDeposits}
//                       onChange={(e) => handleInvestmentChange("fixedDeposits", e.target.value)}
//                       className="mt-1"
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="gold" className="text-sm font-medium">Gold</Label>
//                     <Input
//                       id="gold"
//                       type="number"
//                       value={formData.gold}
//                       onChange={(e) => handleInvestmentChange("gold", e.target.value)}
//                       className="mt-1"
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="emi" className="text-sm font-medium">EMI</Label>
//                     <Input
//                       id="emi"
//                       type="number"
//                       value={formData.emi}
//                       onChange={(e) => handleInvestmentChange("emi", e.target.value)}
//                       className="mt-1"
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="savings" className="text-sm font-medium">Savings</Label>
//                     <Input
//                       id="savings"
//                       type="number"
//                       value={formData.savings}
//                       onChange={(e) => handleInvestmentChange("savings", e.target.value)}
//                       className="mt-1"
//                     />
//                   </div>
//                 </div>
//               </TabsContent>
              
//               <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
//                 <Button type="button" variant="outline" onClick={onClose} className="px-4">
//                   Cancel
//                 </Button>
//                 <Button type="submit" className="px-4 bg-blue-600 hover:bg-blue-700">
//                   Save
//                 </Button>
//               </div>
//             </form>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddExpenseForm;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AddExpenseForm = ({ onClose }) => {
  // Default investment values from your requirements
  const defaultInvestments = {
    stocks: 0,
    bonds: 0,
    mutualFunds: 0,
    realEstate: 0,
    crypto: 0,
    fixedDeposits: 0,
    gold: 0,
    emi: 0,
    savings: 0,
  };

  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    category: "",
    // Add the investment values to the form data
    ...defaultInvestments,
    // Add additional fields for more comprehensive tracking
    timestamp: new Date().toISOString(),
    month_year: new Date().toISOString().slice(0, 7), // Format: YYYY-MM
    notes: "",
    tags: [],
    recurringExpense: false,
    recurringFrequency: "monthly",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = sessionStorage.getItem("uid");
      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      // Ensure the timestamp is updated to the selected date
      const selectedDate = new Date(formData.date);
      const timestamp = selectedDate.toISOString();
      const month_year = formData.date.slice(0, 7);

      const response = await fetch("/api/expense/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userId}` // Add authorization header
        },
        body: JSON.stringify({
          ...formData,
          userId: userId,
          timestamp: timestamp,
          month_year: month_year,
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

  const handleTagAdd = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Calculate total investments
  const totalInvestment = Object.entries(formData)
    .filter(([key]) => Object.keys(defaultInvestments).includes(key))
    .reduce((sum, [_, value]) => sum + (parseFloat(value) || 0), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl bg-white shadow-xl rounded-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
          <CardTitle className="text-2xl font-bold">Investment Tracker</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="investments">Investment Allocation</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
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
                  <p className="text-sm text-blue-700 font-medium">Total Allocation: ${totalInvestment.toFixed(2)}</p>
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

              <TabsContent value="advanced" className="space-y-4">
                <div>
                  <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
                  <textarea
                    id="notes"
                    placeholder="Add any additional notes or details"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full mt-1 p-2 border rounded-md"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recurringExpense"
                    checked={formData.recurringExpense}
                    onChange={(e) => setFormData({ ...formData, recurringExpense: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="recurringExpense" className="text-sm font-medium">Recurring Investment</Label>
                </div>

                {formData.recurringExpense && (
                  <div>
                    <Label htmlFor="recurringFrequency" className="text-sm font-medium">Frequency</Label>
                    <Select
                      value={formData.recurringFrequency}
                      onValueChange={(value) => setFormData({ ...formData, recurringFrequency: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="semiannually">Semi-annually</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium mb-2 block">Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center">
                        <span>{tag}</span>
                        <button
                          type="button"
                          className="ml-1 text-blue-800 hover:text-blue-900"
                          onClick={() => handleTagRemove(tag)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="tagInput"
                      type="text"
                      placeholder="Add a tag"
                      className="flex-grow"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleTagAdd(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      onClick={(e) => {
                        const input = document.getElementById('tagInput');
                        handleTagAdd(input.value);
                        input.value = '';
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add
                    </Button>
                  </div>
                  </div>
              </TabsContent>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save Investment
                </Button>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpenseForm;