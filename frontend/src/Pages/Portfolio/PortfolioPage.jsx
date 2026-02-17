import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import PortfolioOverview from "../../components/portfolio/PortfolioOverview";
import PortfolioDiversification from "../../components/portfolio/PortfolioDiversification";

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPrinting, setIsPrinting] = useState(false);
  const contentRef = useRef(null);


  // Handle print functionality
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Portfolio_Report",
    onBeforeGetContent: () => {
      setIsPrinting(true);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500); // Ensure content renders before printing
      });
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      console.log("PDF export attempt completed");
    },
    removeAfterPrint: true, // Clean up after print
  });

  // Debugging: Check if printRef is available
  useEffect(() => {
    // console.log("Print ref is populated:", contentRef.current);
  }, [activeTab]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Management</h1>
          <p className="text-muted-foreground">Track and optimize your investment portfolio</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <button 
            className="border px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={() => {
              if (contentRef.current) {
                handlePrint();
              } else {
                console.warn("Nothing to print - printRef is empty");
              }
            }}
          >
            Export Data
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add Investment
          </button>
        </div>
      </div>

      {/* Tabs for switching content */}
      <div className="w-full">
        <div className="grid w-full grid-cols-2 border-b">
          <button
            className={`py-2 ${activeTab === "overview" ? "border-b-2 border-blue-500" : ""} hover:bg-gray-50`}
            onClick={() => setActiveTab("overview")}
          >
            Portfolio Overview
          </button>
          <button
            className={`py-2 ${activeTab === "diversification" ? "border-b-2 border-blue-500" : ""} hover:bg-gray-50`}
            onClick={() => setActiveTab("diversification")}
          >
            Portfolio Diversification
          </button>
        </div>
      </div>

      {/* Wrapper div with min height */}
      <div className="mt-4 min-h-[300px]">
        {/* Print content container */}
        <div ref={contentRef} className="print-content" style={{ minHeight: "300px" }}>
          <div className="hidden print:block mb-6">
            <h1 className="text-2xl font-bold text-center">Portfolio Report</h1>
            <p className="text-center text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
            <hr className="my-4" />
          </div>
          
          {/* Main content */}
          <div className="portfolio-content" style={{ minHeight: "200px" }}>
            {activeTab === "overview" ? <PortfolioOverview /> : <PortfolioDiversification />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
