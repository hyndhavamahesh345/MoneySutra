import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, BarChart3, Lightbulb } from "lucide-react";
import VirtualTradingSection from "../../components/simulation/VirtualTradingSection";
import SimulationSummary from "../../components/simulation/SimulationSummary";

export default function SimulationPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Investment Simulation
          </h1>
          <p className="text-muted-foreground">
            Learn investment strategies with virtual money in a risk-free
            environment
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline">Reset Simulation</Button>
          <Button>View Leaderboard</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Virtual Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.75</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium">↑ 24.5%</span> from
              starting amount
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Profit/Loss
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">
              +$2,450.75
            </div>
            <p className="text-xs text-muted-foreground">
              Since simulation started
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Positions
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Across 3 asset classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Simulation Rank
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground">
              Out of 1,245 participants
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trading" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trading">Virtual Trading</TabsTrigger>
          <TabsTrigger value="summary">Simulation Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="trading">
          <VirtualTradingSection />
        </TabsContent>
        <TabsContent value="summary">
          <SimulationSummary />
        </TabsContent>
      </Tabs>
    </div>
  );
}
