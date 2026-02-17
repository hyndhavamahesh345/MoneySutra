import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";

const WalletCard = () => {
  const [walletBalance, setWalletBalance] = useState("Loading...");

  useEffect(() => {
    // Retrieve userId from sessionStorage
    const userId = sessionStorage.getItem("userId");
    console.log("User ID from sessionStorage:", userId); // Debugging
    if (!userId) {
      setWalletBalance("User not found");
      return;
    }

    // Fetch wallet balance from the backend
    const fetchWalletBalance = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/transactions/${userId}/wallet`
        );
        console.log("Response:", response); // Debugging
        if (!response.ok) {
          throw new Error("Failed to fetch wallet balance");
        }
        const data = await response.json();
        console.log("Wallet Balance Data:", data); // Debugging
        setWalletBalance(`$${data.wallet_balance.toFixed(2)}`);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
        setWalletBalance("Error");
      }
    };

    fetchWalletBalance();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{walletBalance}</div>
        <p className="text-xs text-muted-foreground">
          Available for investment
        </p>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
