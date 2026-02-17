import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SIPForm = () => {
  const [sips, setSips] = useState([]); // State to store SIPs as an array
  const userId = sessionStorage.getItem("uid"); // Get the user ID from session storage
  const [formData, setFormData] = useState({
    amount: "",
    frequency: "Monthly",
    startDate: "",
    duration: "",
  });

  // Fetch SIPs when the component mounts
  useEffect(() => {
    const fetchSIPs = async () => {
      try {
        const response = await fetch(`/api/savings/getsip/${userId}`);
        // console.log('spi ' ,response)
        if (!response.ok) {
          throw new Error("Failed to fetch SIPs");
        }
        const data = await response.json();

        // Ensure data is an array, even if the API returns null or undefined
        if (Array.isArray(data)) {
          setSips(data);
        } else {
          console.error("Expected an array but got:", data);
          setSips([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching SIPs:", error);
      }
    };

    fetchSIPs();
  }, [userId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to add a new SIP
  const handleAddSIP = async () => {
    if (!formData.amount || !formData.startDate || !formData.duration) {
      alert("Please fill all fields");
      return;
    }

    const newSIP = {
      amount: formData.amount,
      frequency: formData.frequency,
      startDate: formData.startDate,
      duration: formData.duration,
    };

    try {
      // Save the SIP to the backend
      const response = await fetch(`/api/savings/addsip/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSIP),
      });

      if (!response.ok) {
        throw new Error("Failed to add SIP");
      }

      // Update the local state with the new SIP
      const addedSIP = await response.json();
      setSips((prevSips) => {
        if (Array.isArray(prevSips)) {
          return [...prevSips, addedSIP];
        } else {
          console.error("sips is not an array:", prevSips);
          return [addedSIP]; // Fallback to a new array with the added SIP
        }
      });

      // Clear the form
      setFormData({ amount: "", frequency: "Monthly", startDate: "", duration: "" });

      alert("SIP added successfully!");
    } catch (error) {
      console.error("Error adding SIP:", error);
      alert("Failed to add SIP. Please try again.");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add SIP</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
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
              />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (Years)</Label>
              <Input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Enter duration"
              />
            </div>
          </div>
        </div>
        <Button onClick={handleAddSIP} className="mt-4">
          Add SIP
        </Button>
      </CardContent>

      {/* Display Added SIPs in a Table */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Duration (Years)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(sips) && sips.map((sip, index) => (
              <TableRow key={index}>
                <TableCell>₹{sip.amount}</TableCell>
                <TableCell>{sip.frequency}</TableCell>
                <TableCell>{sip.startDate}</TableCell>
                <TableCell>{sip.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SIPForm;