import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SIPForm from "../../components/saving/SIP";
import BondsForm from "../../components/saving/Bonds";
import MutualFundsForm from "../../components/saving/MutualFunds";
// import BondsForm from "@/components/BondsForm";
// import MutualFundsForm from "@/components/MutualFundsForm";

const Savings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Savings</h1>

      {/* Tabs for SIP, Bonds, and Mutual Funds */}
      <Tabs defaultValue="sip" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sip">SIP</TabsTrigger>
          <TabsTrigger value="bonds">Bonds</TabsTrigger>
          <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
        </TabsList>

        {/* SIP Tab Content */}
        <TabsContent value="sip">
          <SIPForm />
        </TabsContent>

        {/* Bonds Tab Content */}
        <TabsContent value="bonds">
          <BondsForm />
        </TabsContent>

        {/* Mutual Funds Tab Content */}
        <TabsContent value="mutual-funds">
          <MutualFundsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Savings;