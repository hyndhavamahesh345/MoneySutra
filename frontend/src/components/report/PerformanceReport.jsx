"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ArrowRight, FileDown, TrendingUp, TrendingDown } from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter,
  ZAxis, Cell
} from 'recharts';

const benchmarkData = [
  { date: "2025-01-01", portfolio: 0, sp500: 0, nasdaq: 0 },
  { date: "2025-01-15", portfolio: 2.5, sp500: 1.8, nasdaq: 2.2 },
  { date: "2025-02-01", portfolio: 6.0, sp500: 3.5, nasdaq: 4.8 },
  { date: "2025-02-15", portfolio: 12.5, sp500: 5.2, nasdaq: 7.5 },
  { date: "2025-03-01", portfolio: 19.0, sp500: 7.8, nasdaq: 10.2 },
  { date: "2025-03-15", portfolio: 23.5, sp500: 9.5, nasdaq: 12.8 },
]

const riskReturnData = [
  { asset: "Your Portfolio", risk: 12.5, return: 23.5 },
  { asset: "S&P 500", risk: 10.2, return: 9.5 },
  { asset: "NASDAQ", risk: 14.8, return: 12.8 },
  { asset: "NVDA", risk: 22.5, return: 32.5 },
  { asset: "AAPL", risk: 8.5, return: 3.0 },
  { asset: "TSLA", risk: 18.2, return: 10.0 },
  { asset: "BTC", risk: 28.5, return: 15.8 },
  { asset: "GLD", risk: 5.2, return: -2.5 },
]

const sectorPerformance = [
  { sector: "Technology", allocation: 35, return: 18.5 },
  { sector: "Financial", allocation: 15, return: 8.2 },
  { sector: "Healthcare", allocation: 10, return: 5.5 },
  { sector: "Consumer Discretionary", allocation: 12, return: 7.8 },
  { sector: "Energy", allocation: 8, return: 4.2 },
  { sector: "Crypto", allocation: 15, return: 15.8 },
  { sector: "Commodities", allocation: 5, return: -2.5 },
]

const colors = ['#0ea5e9', '#8b5cf6', '#f43f5e', '#10b981', '#f59e0b', '#6366f1', '#ec4899'];

export function PerformanceReport() {
  const [activeTab, setActiveTab] = useState('returns');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border rounded shadow-sm">
          <div className="font-medium">{payload[0].payload.asset || payload[0].payload.sector || label}</div>
          {payload.map((entry, index) => {
            const dataKey = entry.dataKey;
            const value = entry.value;
            const name = dataKey === 'y' ? 'Return' : dataKey === 'x' ? 'Risk' : entry.name;
            return (
              <div key={index} className="text-xs mt-1">
                {name}: {value}%
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-4 md:grid-cols-7">
      <Card className="md:col-span-7">
        <CardHeader>
          <CardTitle>Benchmark Comparison</CardTitle>
          <CardDescription>Your portfolio performance compared to major market indices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={benchmarkData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="portfolio" 
                  name="Your Portfolio" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sp500" 
                  name="S&P 500" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="nasdaq" 
                  name="NASDAQ" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <div className="text-sm font-medium">Your Portfolio</div>
              <div className="text-lg font-medium text-emerald-500">+23.5%</div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <div className="text-sm font-medium">S&P 500</div>
              <div className="text-lg font-medium text-emerald-500">+9.5%</div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <div className="text-sm font-medium">NASDAQ</div>
              <div className="text-lg font-medium text-emerald-500">+12.8%</div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <div className="text-sm font-medium">Outperformance</div>
              <div className="text-lg font-medium text-emerald-500">+14.0%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>Risk vs. Return Analysis</CardTitle>
          <CardDescription>Evaluating your portfolio's risk-adjusted performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid />
                <XAxis 
                  type="number" 
                  dataKey="risk" 
                  name="Risk" 
                  unit="%" 
                  label={{ value: 'Risk (Volatility)', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  type="number" 
                  dataKey="return" 
                  name="Return" 
                  unit="%" 
                  label={{ value: 'Return', angle: -90, position: 'insideLeft' }} 
                />
                <ZAxis range={[60, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                <Legend />
                <Scatter name="Assets" data={riskReturnData} fill="#8884d8">
                  {riskReturnData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.asset === "Your Portfolio" ? "hsl(var(--primary))" : colors[index % colors.length]} 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Risk-Adjusted Performance</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your portfolio has a Sharpe Ratio of 1.88, indicating good risk-adjusted returns compared to the market
                average of 0.95.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Sector Performance</CardTitle>
          <CardDescription>Returns by investment sector</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="returns" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
            </TabsList>
            <TabsContent value="returns" className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="sector" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="return" 
                      name="Return"
                    >
                      {sectorPerformance.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.return >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="allocation" className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="sector" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="allocation" name="Allocation" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Top Performing Sector</div>
              <Badge variant="outline" className="text-emerald-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                Technology +18.5%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Worst Performing Sector</div>
              <Badge variant="outline" className="text-rose-500">
                <TrendingDown className="mr-1 h-3 w-3" />
                Commodities -2.5%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-7">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>AI-powered analysis of your investment performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-emerald-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Outperformance
                </Badge>
              </div>
              <h3 className="text-base font-medium mb-2">Market Benchmark</h3>
              <p className="text-sm text-muted-foreground">
                Your portfolio has outperformed the S&P 500 by 14.0% this quarter, primarily due to your technology and
                cryptocurrency allocations.
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View Details
              </Button>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-primary">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Risk Analysis
                </Badge>
              </div>
              <h3 className="text-base font-medium mb-2">Volatility Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Your portfolio has a volatility of 12.5%, slightly higher than the S&P 500 (10.2%). Consider adding more
                stable assets if you're concerned about risk.
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View Details
              </Button>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-amber-500">
                  <FileDown className="mr-1 h-3 w-3" />
                  Recommendations
                </Badge>
              </div>
              <h3 className="text-base font-medium mb-2">Portfolio Adjustments</h3>
              <p className="text-sm text-muted-foreground">
                Based on your risk profile and market conditions, consider increasing your allocation to healthcare and
                reducing exposure to commodities.
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View Details
              </Button>
            </div>
          </div>
          </CardContent>
      </Card>
    </div>
  )
}