import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleTranslate from "./Translate/GoogleTranslate";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userId = sessionStorage.getItem("uid");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("uid");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 w-full shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 text-2xl font-bold transition-all duration-300 hover:text-gray-400">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Moneyसूत्र Logo" className="h-10 w-10" />
            <span className="text-xl font-extrabold text-blue-400">
              Moneyसूत्र
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link
            to="/"
            className="text-white transition duration-200 hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            to="/tax"
            className="block text-white transition duration-200 hover:text-gray-300"
          >
            About Taxes
          </Link>
          {/* <Link
            to="/help"
            className="text-white transition duration-200 hover:text-gray-300"
          >
            Help & Support
          </Link> */}
          <Link
            to="/lessons"
            className="text-white transition duration-200 hover:text-gray-300"
          >
            E-Books
          </Link>
        </div>

        {/* Profile and Logout / Login & Signup */}
        <div className="flex items-center space-x-4">
          {userId ? (
            <>
              <Link
                to="/dashboard"
                className="text-white transition duration-200 hover:text-gray-300 border-2 border-white py-2 px-4 rounded-md hover:bg-gray-700 transform transition-all duration-300"
              >
                Dashboard
              </Link>
              {/* <Link
                to="/profile"
                className="text-white transition duration-200 hover:text-gray-300 border-2 border-white py-2 px-4 rounded-md hover:bg-gray-700 transform transition-all duration-300"
              >
                Profile
              </Link> */}
              {/* <Link
                to="/tax"
                className="block text-white transition duration-200 hover:text-gray-300"
              >
                About Taxes
              </Link> */}
              <button
                onClick={handleLogout}
                className="text-white transition duration-200 hover:text-gray-300 border-2 border-white py-2 px-4 rounded-md hover:bg-gray-700 transform transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white transition duration-200 hover:text-gray-300 border-2 border-white py-2 px-4 rounded-md hover:bg-gray-700 transform transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white transition duration-200 hover:text-gray-300 border-2 border-white py-2 px-4 rounded-md hover:bg-gray-700 transform transition-all duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <GoogleTranslate />

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } lg:hidden bg-gray-800 text-white p-4 space-y-4 transition-all duration-500 transform`}
      >
        <Link
          to="/"
          className="block text-white transition duration-200 hover:text-gray-300"
        >
          Home
        </Link>
        <Link
          to="/help"
          className="block text-white transition duration-200 hover:text-gray-300"
        >
          Help & Support
        </Link>
        {userId ? (
          <>
            <Link
              to="/dashboard"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Profile
            </Link>
            <Link
              to="/tax"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              About Taxes
            </Link>
            <button
              onClick={handleLogout}
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/tax"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              About Taxes
            </Link>
            <Link
              to="/login"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
