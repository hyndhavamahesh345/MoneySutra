"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Info, ShieldAlert, ShieldCheck } from "lucide-react"
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
 
} from "recharts"

const currentAllocation = [
  { name: "Stocks", value: 45, color: "#0ea5e9", risk: "Medium" },
  { name: "Bonds", value: 20, color: "#8b5cf6", risk: "Low" },
  { name: "Crypto", value: 15, color: "#f43f5e", risk: "High" },
  { name: "Real Estate", value: 10, color: "#10b981", risk: "Medium" },
  { name: "Gold", value: 5, color: "#f59e0b", risk: "Low" },
  { name: "Cash", value: 5, color: "#6b7280", risk: "Very Low" },
]

const recommendedAllocation = [
  { name: "Stocks", value: 40, color: "#0ea5e9", risk: "Medium" },
  { name: "Bonds", value: 25, color: "#8b5cf6", risk: "Low" },
  { name: "Crypto", value: 10, color: "#f43f5e", risk: "High" },
  { name: "Real Estate", value: 15, color: "#10b981", risk: "Medium" },
  { name: "Gold", value: 5, color: "#f59e0b", risk: "Low" },
  { name: "Cash", value: 5, color: "#6b7280", risk: "Very Low" },
]

const riskData = [
  { category: "Stocks", risk: 65 },
  { category: "Bonds", risk: 25 },
  { category: "Crypto", risk: 90 },
  { category: "Real Estate", risk: 50 },
  { category: "Gold", risk: 30 },
  { category: "Cash", risk: 5 },
]

const diversificationMetrics = [
  { name: "Asset Class Diversity", score: 85, description: "Good mix of different asset classes" },
  { name: "Geographic Diversity", score: 60, description: "Could benefit from more international exposure" },
  { name: "Sector Diversity", score: 75, description: "Good distribution across sectors" },
  { name: "Risk Balance", score: 70, description: "Slightly higher risk than recommended" },
]

// Custom tooltip component for pie charts
const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-3 bg-background shadow-lg rounded-md border border-border">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
          <span className="font-medium">{data.name}</span>
        </div>
        <div className="mt-1 font-bold">{data.value}%</div>
        <div className="mt-1 text-xs text-muted-foreground">Risk: {data.risk}</div>
      </div>
    );
  }
  return null;
};

// Custom tooltip for bar chart
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-background shadow-lg rounded-md border border-border">
        <p className="font-medium">{label}</p>
        <p className="font-bold">{`Risk: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function PortfolioDiversification() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Diversification Score</CardTitle>
          <CardDescription>Analysis of your portfolio's diversification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-8 border-primary/20">
              <div className="text-center">
                <div className="text-4xl font-bold">7.2</div>
                <div className="text-sm text-muted-foreground">out of 10</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Badge variant="outline" className="mb-2">
                Good
              </Badge>
              <p className="text-sm text-muted-foreground">
                Your portfolio has good diversification but could be improved
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {diversificationMetrics.map((metric) => (
              <div key={metric.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{metric.name}</span>
                  <span className="font-medium">{metric.score}/100</span>
                </div>
                <Progress value={metric.score} className="h-2" />
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
          <CardDescription>Evaluation of risk levels across your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={riskData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="risk" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
              <ShieldAlert className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">High Risk Assets (15%)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your cryptocurrency allocation represents a significant risk. Consider reducing exposure if you're
                  concerned about volatility.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Low Risk Assets (30%)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your bonds, gold, and cash provide stability to your portfolio and help balance overall risk.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>AI Portfolio Recommendations</CardTitle>
          <CardDescription>Suggested adjustments to optimize your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="comparison">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comparison">Current vs. Recommended</TabsTrigger>
              <TabsTrigger value="actions">Recommended Actions</TabsTrigger>
            </TabsList>
            <TabsContent value="comparison" className="pt-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-center">Current Allocation</h3>
                  <div className="flex justify-center">
                    <div className="h-52 w-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={currentAllocation}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            cornerRadius={4}
                          >
                            {currentAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomPieTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4 text-center">Recommended Allocation</h3>
                  <div className="flex justify-center">
                    <div className="h-52 w-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={recommendedAllocation}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            cornerRadius={4}
                          >
                            {recommendedAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomPieTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Key Differences</p>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500">-5%</span>
                        <span>Reduce cryptocurrency exposure to lower overall portfolio risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500">+5%</span>
                        <span>Increase bonds allocation for more stability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500">+5%</span>
                        <span>Increase real estate exposure for better diversification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500">-5%</span>
                        <span>Slightly reduce stock exposure to balance risk</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="actions" className="pt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Rebalance Your Portfolio</CardTitle>
                    <CardDescription>Adjust your holdings to match the recommended allocation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span>Sell $1,250 worth of cryptocurrency assets</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span>Buy $1,250 worth of bond ETFs</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span>Buy $1,250 worth of real estate investment trusts</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span>Sell $1,250 worth of technology stocks</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Apply Rebalancing</Button>
                  </CardFooter>
                </Card>
                

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Diversify Geographically</CardTitle>
                    <CardDescription>Add international exposure to your portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span>Add emerging markets ETF (5% allocation)</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span>Add European markets ETF (5% allocation)</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span>Add Asia-Pacific markets ETF (5% allocation)</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View</Button>
  </CardFooter>
</Card>
              

                <Card>
  <CardHeader className="pb-2">
    <CardTitle className="text-base">Optimize Tax Efficiency</CardTitle>
    <CardDescription>Improve after-tax returns with these adjustments</CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      <li className="flex items-center gap-2 text-sm">
        <Check className="h-4 w-4 text-emerald-500" />
        <span>Move high-yield investments to tax-advantaged accounts</span>
      </li>
      <li className="flex items-center gap-2 text-sm">
        <Check className="h-4 w-4 text-emerald-500" />
        <span>Consider tax-loss harvesting opportunities</span>
      </li>
      <li className="flex items-center gap-2 text-sm">
        <Check className="h-4 w-4 text-emerald-500" />
        <span>Add municipal bonds for tax-exempt income</span>
      </li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Get Tax Optimization Plan</Button>
  </CardFooter>
</Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save Recommendations</Button>
          <Button>Apply All Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
