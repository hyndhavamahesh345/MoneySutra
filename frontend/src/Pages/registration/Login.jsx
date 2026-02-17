import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userRole = data.user.role || "User";

        sessionStorage.setItem("email", data.user.email);
        sessionStorage.setItem("username", data.user.username);
        sessionStorage.setItem("uid", data.user.uid);
        sessionStorage.setItem("role", userRole);

        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials!");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full mx-4 md:mx-0">
        {/* Left Side - Login Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to Money Sutra
          </h1>
          <p className="text-gray-600 mt-2">
            Optimize Your Investments with AI & Data Analytics
          </p>

          {/* Demo Credentials Box */}
          <div className="mt-4 p-3 border border-gray-300 bg-gray-100 rounded-md text-sm text-gray-700">
            <p className="font-semibold">Demo Credentials for Users:</p>
            <p>Email: <span className="font-mono">sample@gmail.com</span></p>
            <p>Password: <span className="font-mono">123456789</span></p>
          </div>
          <div className="mt-4 p-3 border border-gray-300 bg-gray-100 rounded-md text-sm text-gray-700">
            <p className="font-semibold">Demo Credentials for Advisors:</p>
            <p>Email: <span className="font-mono">testadvisor@gmail.com</span></p>
            <p>Password: <span className="font-mono">123456789</span></p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="../../../public/logo.svg"
            alt="Login"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
