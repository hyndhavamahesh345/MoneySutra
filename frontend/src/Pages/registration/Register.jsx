import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { Person, Email, Lock, Gavel } from "@mui/icons-material";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    aadhaarId: "",
    panNumber: "",
    dob: "",
    role: "User", // Default role
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      aadhaarId: formData.aadhaarId,
      panNumber: formData.panNumber,
      dob: formData.dob,
      role: formData.role, // Include role in payload
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          aadhaarId: "",
          panNumber: "",
          dob: "",
          role: "User",
        });
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Error connecting to server");
    }
  };

  return (
    <div className="flex justify-center h-fit items-center py-20">
      <div className="bg-white lg:flex-row flex-col lg:p-8 p-6 rounded-lg shadow-lg flex lg:w-3/4">
        <div className="lg:w-1/2 w-full items-center justify-center lg:p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">Moneysutra</h1>
          <p className="mb-6 text-gray-600">
            Join MoneyMitra and start your Investment Journey
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="w-full">
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{ startAdornment: <Person /> }}
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{ startAdornment: <Email /> }}
            />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Aadhaar ID"
              name="aadhaarId"
              value={formData.aadhaarId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{ startAdornment: <Gavel /> }}
            />
            <TextField
              label="PAN Number"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{ startAdornment: <Gavel /> }}
            />
            
            {/* Role Selection Dropdown */}
            <TextField
              select
              label="Select Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Advisor">Advisor</MenuItem>
            </TextField>

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{ startAdornment: <Lock /> }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{ startAdornment: <Lock /> }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Register
            </Button>
          </form>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?q=80&w=1935&auto=format&fit=crop"
            alt="Investment"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
