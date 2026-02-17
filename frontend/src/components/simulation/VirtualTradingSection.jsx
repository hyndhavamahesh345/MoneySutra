"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Search, Info } from "lucide-react";

const stockData = [
  { id: "1", name: "Tesla Inc.", symbol: "TSLA", price: 242.5, change: "+2.4%" },
  { id: "2", name: "Apple Inc.", symbol: "AAPL", price: 175.25, change: "-0.8%" },
  { id: "3", name: "Microsoft Corp.", symbol: "MSFT", price: 328.75, change: "+1.2%" },
];

export default function VirtualTradingSection() {
  const [selectedStock, setSelectedStock] = useState(stockData[0]);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStocks = stockData.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setQuantity(1);
  };

  const estimatedCost = selectedStock.price * quantity;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Available Assets</CardTitle>
          <CardDescription>Select an asset to trade</CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map((stock) => (
                <TableRow key={stock.id} onClick={() => handleStockSelect(stock)}>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>${stock.price}</TableCell>
                  <TableCell>{stock.change}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {selectedStock.name} ({selectedStock.symbol})
          </CardTitle>
          <CardDescription>Current Price: ${selectedStock.price}</CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Quantity</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          />
          <div>Estimated Cost: ${estimatedCost}</div>
        </CardContent>
        <CardFooter>
          <Button>Place Order</Button>
        </CardFooter>
      </Card>
    </div>
  );
}