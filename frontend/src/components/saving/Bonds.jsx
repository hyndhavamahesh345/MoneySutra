import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BondsForm = () => {
  const [bonds, setBonds] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    interestRate: "",
    maturityDate: "",
    bondName: "",
    bondType: "Government",
    couponFrequency: "Annual",
    purchaseDate: "",
    yieldToMaturity: "",
    creditRating: "AAA",
    taxStatus: "Taxable",
  });

  const userId = sessionStorage.getItem("uid"); // Get user ID from session storage

  // Fetch bonds when the component mounts
  useEffect(() => {
    fetchBonds();
  }, []);

  const fetchBonds = async () => {
    try {
      const response = await fetch(`/api/savings/getbonds/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch bonds");
      }
      const data = await response.json();
      setBonds(data);
    } catch (error) {
      console.error("Error fetching bonds:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddBond = async () => {
    // Check if all required fields are filled
    // const requiredFields = [
    //   "amount",
    //   "interestRate",
    //   "maturityDate",
    //   "bondName",
    //   "purchaseDate",
    //   "yieldToMaturity",
    // ];

    // const isFormValid = requiredFields.every((field) => formData[field].trim() !== "");

    // if (!isFormValid) {
    //   alert("Please fill all required fields.");
    //   return;
    // }

    try {
      const response = await fetch(`/api/savings/addbonds/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add bond");
      }

      const newBond = await response.json();
      setBonds([...bonds, newBond]); // Update the bonds state with the new bond
      setFormData({
        amount: "",
        interestRate: "",
        maturityDate: "",
        bondName: "",
        bondType: "Government",
        couponFrequency: "Annual",
        purchaseDate: "",
        yieldToMaturity: "",
        creditRating: "AAA",
        taxStatus: "Taxable",
      });
    } catch (error) {
      console.error("Error adding bond:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Bond</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                type="number"
                id="interestRate"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleInputChange}
                placeholder="Enter interest rate"
                required
              />
            </div>
            <div>
              <Label htmlFor="bondName">Bond Name/Issuer</Label>
              <Input
                type="text"
                id="bondName"
                name="bondName"
                value={formData.bondName}
                onChange={handleInputChange}
                placeholder="Enter bond name or issuer"
                required
              />
            </div>
            <div>
              <Label htmlFor="bondType">Bond Type</Label>
              <select
                id="bondType"
                name="bondType"
                value={formData.bondType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Government">Government Bond</option>
                <option value="Corporate">Corporate Bond</option>
                <option value="Municipal">Municipal Bond</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="couponFrequency">Coupon Payment Frequency</Label>
              <select
                id="couponFrequency"
                name="couponFrequency"
                value={formData.couponFrequency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Annual">Annual</option>
              </select>
            </div>
            <div>
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="yieldToMaturity">Yield to Maturity (YTM)</Label>
              <Input
                type="number"
                id="yieldToMaturity"
                name="yieldToMaturity"
                value={formData.yieldToMaturity}
                onChange={handleInputChange}
                placeholder="Enter YTM"
                required
              />
            </div>
            <div>
              <Label htmlFor="creditRating">Credit Rating</Label>
              <select
                id="creditRating"
                name="creditRating"
                value={formData.creditRating}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="AAA">AAA</option>
                <option value="AA">AA</option>
                <option value="BBB">BBB</option>
                <option value="BB">BB</option>
                <option value="B">B</option>
              </select>
            </div>
            <div>
              <Label htmlFor="taxStatus">Tax Status</Label>
              <select
                id="taxStatus"
                name="taxStatus"
                value={formData.taxStatus}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Taxable">Taxable</option>
                <option value="Tax-Free">Tax-Free</option>
              </select>
            </div>
          </div>
        </div>
        <Button onClick={handleAddBond} className="mt-4">
          Add Bond
        </Button>
      </CardContent>

      {/* Display Added Bonds in a Table */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Interest Rate (%)</TableHead>
              {/* <TableHead>Maturity Date</TableHead> */}
              <TableHead>Bond Name</TableHead>
              <TableHead>Bond Type</TableHead>
              <TableHead>Coupon Frequency</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>YTM (%)</TableHead>
              <TableHead>Credit Rating</TableHead>
              <TableHead>Tax Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bonds.map((bond) => (
              <TableRow key={bond.id}>
                <TableCell>₹{bond.amount}</TableCell>
                <TableCell>{bond.interestRate}%</TableCell>
                {/* <TableCell>{bond.maturityDate}</TableCell> */}
                <TableCell>{bond.bondName}</TableCell>
                <TableCell>{bond.bondType}</TableCell>
                <TableCell>{bond.couponFrequency}</TableCell>
                <TableCell>{bond.purchaseDate}</TableCell>
                <TableCell>{bond.yieldToMaturity}%</TableCell>
                <TableCell>{bond.creditRating}</TableCell>
                <TableCell>{bond.taxStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BondsForm;