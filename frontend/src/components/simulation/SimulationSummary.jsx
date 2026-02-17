import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb, Trophy, TrendingUp } from "lucide-react";

const portfolioHistory = [
  { date: "2025-03-01", value: 10000 },
  { date: "2025-03-02", value: 10120 },
  { date: "2025-03-03", value: 10050 },
  { date: "2025-03-04", value: 10200 },
  { date: "2025-03-05", value: 10350 },
  { date: "2025-03-06", value: 10500 },
  { date: "2025-03-07", value: 10620 },
  { date: "2025-03-08", value: 10800 },
  { date: "2025-03-09", value: 11200 },
  { date: "2025-03-10", value: 11500 },
  { date: "2025-03-11", value: 12100 },
  { date: "2025-03-12", value: 12450 },
];

const holdingsData = [
  {
    id: "1",
    name: "Tesla Inc.",
    symbol: "TSLA",
    shares: 5,
    avgPrice: 220.5,
    currentPrice: 242.5,
    value: 1212.5,
    change: "+10.0%",
  },
  {
    id: "2",
    name: "Apple Inc.",
    symbol: "AAPL",
    shares: 10,
    avgPrice: 170.25,
    currentPrice: 175.25,
    value: 1752.5,
    change: "+2.9%",
  },
];

export default function SimulationSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Track your virtual portfolio's growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Current Holdings</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdingsData.map((holding) => (
                  <TableRow key={holding.id}>
                    <TableCell className="font-medium">
                      <div>
                        {holding.symbol}
                        <div className="text-xs text-muted-foreground">{holding.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{holding.shares}</TableCell>
                    <TableCell>${holding.value.toLocaleString()}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        holding.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {holding.change}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
