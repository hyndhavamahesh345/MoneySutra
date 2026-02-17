import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Shield, TrendingUp, Zap } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const Overview = ({ bonds, mutualFunds, sips, assetAllocationData, investmentRadarData, generateInsights, insights, tips }) => {
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

  // Colors for PieChart
  const COLORS = ["#6A0DAD", "#9B30FF", "#B266FF", "#D9B3FF"];


  return (
    <TabsContent value="overview" className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Bonds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">₹{assetAllocationData[0].value.toFixed(2)}</div>
              <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                <Shield size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{bonds.length} active bonds</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Mutual Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">₹{assetAllocationData[1].value.toFixed(2)}</div>
              <div className="bg-orange-100 text-orange-800 p-2 rounded-full">
                <TrendingUp size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{mutualFunds.length} active funds</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total SIPs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">₹{assetAllocationData[2].value.toFixed(2)}</div>
              <div className="bg-green-100 text-green-800 p-2 rounded-full">
                <Zap size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{sips.length} active SIPs</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Distribution of your investments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetAllocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investment Distribution Radar */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle>Investment Distribution</CardTitle>
            <CardDescription>Multi-dimensional view of your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={investmentRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Amount"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-white shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>AI Portfolio Insights</CardTitle>
            <CardDescription>Get personalized recommendations</CardDescription>
          </div>
          <button
            onClick={generateInsights}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Generate Insights
          </button>
        </CardHeader>
        <CardContent>
          {insights.length > 0 && tips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-blue-600">Insights</h3>
                <ul className="space-y-2">
                  {insights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-800 h-5 w-5 text-xs mr-2 mt-1">
                        {index + 1}
                      </span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-600">Action Tips</h3>
                <ul className="space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-800 h-5 w-5 text-xs mr-2 mt-1">
                        {index + 1}
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Click "Generate Insights" to get AI-powered recommendations for your portfolio
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Overview;