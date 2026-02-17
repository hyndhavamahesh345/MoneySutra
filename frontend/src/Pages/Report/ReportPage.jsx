import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfitLossReport } from "../../components/report/ProfitLossReport";
import { PerformanceReport } from "../../components/report/PerformanceReport";
import { FileDown, FileText, BarChart3, Calendar } from "lucide-react";

const ReportsPage = () => {
  const contentRef = useRef(null); // Ref for the component to be printed

  // Handle print functionality
  const handlePrint = useReactToPrint({
    contentRef, // Reference to the component to print
    documentTitle: "Portfolio_Report",
    onAfterPrint: () => console.log("PDF export completed"), // Callback after printing
  });

  return (
    <div className="container mx-auto py-6">
      {/* Print button moved to the top */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Detailed analysis of your investment performance</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Select Date Range
          </Button>
          <Button onClick={handlePrint}>
            <FileDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Content to be printed */}
      <div ref={contentRef}>
        {/* Cards Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit/Loss</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">+$4,685.75</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 font-medium">↑ 23.5%</span> return on investment
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Performing Asset</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">NVDA</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 font-medium">↑ 32.5%</span> in the last 3 months
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Worst Performing Asset</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">GLD</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-rose-500 font-medium">↓ 2.5%</span> in the last 3 months
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Report Period</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Q1 2025</div>
              <p className="text-xs text-muted-foreground">Jan 1, 2025 - Mar 15, 2025</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="profit-loss" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profit-loss">Profit & Loss Report</TabsTrigger>
            <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="profit-loss">
            <ProfitLossReport />
          </TabsContent>
          <TabsContent value="performance">
            <PerformanceReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportsPage;