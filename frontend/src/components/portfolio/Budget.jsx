import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const Budget = ({ budget, budgetUtilizationData, budgetAllocationData }) => {
    // Calculate total expenses
    const totalExpenses = budgetAllocationData.reduce((sum, item) => sum + item.value, 0);

    // Calculate savings (Income - Total Expenses)
    const savings = (budget.income || 0) - totalExpenses;

    // Custom label for PieChart
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Custom Tooltip for PieChart
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-200 rounded shadow">
                    <p className="font-semibold">{payload[0].name}</p>
                    <p>₹{payload[0].value.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    // Blue-themed colors for charts
    const COLORS = ["#4A90E2", "#76B2E6", "#A1C9F1", "#D4E7F9"];

    return (
        <TabsContent value="budget" className="space-y-6">
            {/* Budget Overview */}
            <Card className="bg-white shadow-md">
                <CardHeader>
                    <CardTitle>Budget Overview</CardTitle>
                    <CardDescription>Your income and expenses</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Total Income */}
                        <div className="bg-blue-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Total Income</p>
                            <h3 className="text-2xl font-bold">₹{parseInt(budget.income || 0).toFixed(2)}</h3>
                        </div>

                        {/* Total Expenses */}
                        <div className="bg-blue-200 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Total Expenses</p>
                            <h3 className="text-2xl font-bold">₹{totalExpenses.toFixed(2)}</h3>
                            <p className="text-xs mt-1">
                                {budget.income ? ((totalExpenses / budget.income) * 100).toFixed(1) : 0}% of income
                            </p>
                        </div>

                        {/* Total Savings */}
                        <div className="bg-blue-300 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Total Savings</p>
                            <h3 className="text-2xl font-bold">₹{savings.toFixed(2)}</h3>
                            <p className="text-xs mt-1">
                                {budget.income ? ((savings / budget.income) * 100).toFixed(1) : 0}% of income
                            </p>
                        </div>
                    </div>

                    {/* Bar Chart for Budget Utilization */}
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={budgetUtilizationData} barSize={40}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#D4E7F9" />
                            <XAxis dataKey="name" tick={{ fill: "#4A90E2" }} />
                            <YAxis tick={{ fill: "#4A90E2" }} />
                            <Tooltip />
                            <Bar dataKey="value">
                                {budgetUtilizationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Budget Allocation */}
            <Card className="bg-white shadow-md">
                <CardHeader>
                    <CardTitle>Budget Allocation</CardTitle>
                    <CardDescription>Where your money goes</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pie Chart for Budget Allocation */}
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={budgetAllocationData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#D4E7F9"
                                    dataKey="value"
                                >
                                    {budgetAllocationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Table for Budget Allocation */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>% of Budget</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {budgetAllocationData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>₹{item.value.toFixed(2)}</TableCell>
                                        <TableCell>
                                            {((item.value / (parseFloat(budget.income || 0))) * 100).toFixed(1)}%
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default Budget;