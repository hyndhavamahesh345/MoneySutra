import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Papa from "papaparse"; // Import papaparse for CSV conversion

const API_URL = "/api/transactions";

const MoneyTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    id: null, // For update functionality
    description: "",
    category: "Income",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    time: `${String(new Date().getHours()).padStart(2, "0")}:${String(
      new Date().getMinutes()
    ).padStart(2, "0")}`,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To toggle between add and edit mode

  // Convert 24-hour time to 12-hour format with AM/PM
  const convertTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(":");
    const parsedHours = parseInt(hours, 10);
    const suffix = parsedHours >= 12 ? "PM" : "AM";
    const twelveHour = parsedHours % 12 || 12;
    return `${twelveHour}:${minutes} ${suffix}`;
  };

  // Convert 12-hour time with AM/PM to 24-hour format
  const convertTo24Hour = (time12) => {
    const [time, modifier] = time12.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  const fetchTransactions = async () => {
    const uid = sessionStorage.getItem("uid");
    if (!uid) {
      setError("User ID missing. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${uid}`);
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();

      const transformedData = data.map((transaction) => ({
        ...transaction,
        category:
          transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
        amount: parseFloat(transaction.amount),
      }));

      setTransactions(transformedData);
    } catch (error) {
      setError("Failed to fetch transactions.");
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = async () => {
    setError(null);
    setSuccess(null);

    const uid = sessionStorage.getItem("uid");
    if (!uid) {
      setError("User ID missing. Please log in.");
      return;
    }

    if (!form.description || !form.amount || parseFloat(form.amount) <= 0) {
      setError("Valid Description and Amount are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${uid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: form.description,
          type: form.category.toLowerCase(),
          amount: parseFloat(form.amount),
          date: form.date,
          time: convertTo12Hour(form.time), // Convert to 12-hour format before sending
        }),
      });

      if (!response.ok) throw new Error("Failed to add transaction");

      setSuccess("Transaction added successfully!");
      resetForm();
      await fetchTransactions();
    } catch (error) {
      setError("Failed to add transaction. Please try again.");
      console.error("Add Transaction Error:", error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setForm({
      id: transaction.id,
      description: transaction.description,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date,
      time: transaction.time.includes(" ")
        ? convertTo24Hour(transaction.time)
        : transaction.time, // Convert back to 24-hour format for the input field
    });
    setIsEditing(true);
  };

  const handleUpdateTransaction = async () => {
    setError(null);
    setSuccess(null);

    const uid = sessionStorage.getItem("uid");
    if (!uid) {
      setError("User ID missing. Please log in.");
      return;
    }

    if (!form.description || !form.amount || parseFloat(form.amount) <= 0) {
      setError("Valid Description and Amount are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${uid}/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: form.description,
          type: form.category.toLowerCase(),
          amount: parseFloat(form.amount),
          date: form.date,
          time: convertTo12Hour(form.time), // Convert to 12-hour format before sending
        }),
      });

      if (!response.ok) throw new Error("Failed to update transaction");

      setSuccess("Transaction updated successfully!");
      resetForm();
      await fetchTransactions();
    } catch (error) {
      setError("Failed to update transaction. Please try again.");
      console.error("Update Transaction Error:", error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    setError(null);
    setSuccess(null);

    const uid = sessionStorage.getItem("uid");
    if (!uid) {
      setError("User ID missing. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${uid}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete transaction");

      setSuccess("Transaction deleted successfully!");
      await fetchTransactions();
    } catch (error) {
      setError("Failed to delete transaction. Please try again.");
      console.error("Delete Transaction Error:", error);
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      description: "",
      category: "Income",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      time: `${String(new Date().getHours()).padStart(2, "0")}:${String(
        new Date().getMinutes()
      ).padStart(2, "0")}`,
    });
    setIsEditing(false);
  };

  // Function to export transactions as CSV
  const exportToCSV = () => {
    if (transactions.length === 0) {
      setError("No transactions to export.");
      return;
    }

    // Prepare CSV data
    const csvData = transactions.map((transaction) => ({
      Description: transaction.description,
      Category: transaction.category,
      Amount: `₹${transaction.amount}`,
      Date: transaction.date,
      Time: transaction.time,
    }));

    // Convert to CSV
    const csv = Papa.unparse(csvData, {
      header: true, // Include headers in the CSV
    });

    // Create a Blob and trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="grid gap-4 md:grid-cols-7">
      <Card className="md:col-span-7">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Money Tracker
              </h1>
              <p className="text-muted-foreground">
                Track your money efficiently
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <Button onClick={exportToCSV}>Export CSV</Button>
              <Button>View Details</Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="md:col-span-2"
            />
            <Select
              value={form.category}
              onValueChange={(value) => setForm({ ...form, category: value })}
            >
              <SelectTrigger className="md:col-span-1">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="amount"
              type="number"
              placeholder="Amount"
              value={form.amount}
              min="1"
              onChange={handleChange}
              className="md:col-span-1"
            />
            <Input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="md:col-span-1"
            />
            <Input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              className="md:col-span-1"
            />
            {isEditing ? (
              <>
                <Button
                  onClick={handleUpdateTransaction}
                  className="md:col-span-1"
                >
                  Update
                </Button>
                <Button
                  onClick={resetForm}
                  className="md:col-span-1"
                  variant="outline"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleAddTransaction} className="md:col-span-1">
                Add
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="md:col-span-7">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>₹{transaction.amount}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.time}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEditTransaction(transaction)}
                      variant="outline"
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteTransaction(transaction.id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoneyTracker;