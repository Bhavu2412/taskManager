import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "./logo.png";
import image2 from "./image2.png";
import {
  faBars,
  faTimes,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "rsuite";

function Navbar({ darkMode, setDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Track login state

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    setIsLoggedIn(false); // Update state
    if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Listen for token changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div
      className={`w-full h-16 flex items-center justify-between pr-4 ${
        darkMode
          ? "bg-black text-white"
          : "bg-red-400 text-xl cursive text-black"
      } transition-all`}
    >
      {/* Logo and Menu */}
      <div className="flex items-center space-x-4">
        <a href="/">
          {darkMode ? (
            <img src={image2} alt="logo" className="m-0 p-0 h-16" />
          ) : (
            <img src={image} alt="logo" className="m-0 p-0 h-16" />
          )}
        </a>
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-2">
          <a
            href="/"
            className="text-xl cursive text-black dark:text-white px-3 py-1 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-xl cursive text-black dark:text-white px-3 py-1 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
          >
            About Us
          </a>
          <a
            href="/contactus"
            className="text-xl cursive text-black dark:text-white px-3 py-1 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center space-x-2">
        {!isLoggedIn ? (
          <>
            <a
              href="/signup"
              className="text-xl cursive text-black dark:text-white px-3 py-1 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="text-xl cursive text-black dark:text-white px-3 py-1 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
            >
              Login
            </a>
          </>
        ) : (
          <>
            <p
              className="text-xl cursive text-black dark:text-white px-3 py-1 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
              onClick={handleLogoutClick}
            >
              Logout
            </p>
            {localStorage.getItem("image") && (
              <a href="/profile">
                <Avatar circle size="sm" src={localStorage.getItem("image")} />
              </a>
            )}
          </>
        )}
        <button
          onClick={toggleDarkMode}
          className="text-xl cursive text-black dark:text-white px-3 py-1 rounded-lg transition-all duration-300"
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu}>
          <FontAwesomeIcon
            className="h-6"
            icon={isMobileMenuOpen ? faTimes : faBars}
            style={{ color: "#fff" }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-red-400 dark:bg-gray-800 z-10 flex flex-col items-center space-y-4 py-4">
          <a
            href="/home"
            className="text-xl cursive text-black dark:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
            onClick={toggleMobileMenu}
          >
            Home
          </a>
          <a
            href="/aboutus"
            className="text-xl cursive text-black dark:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
            onClick={toggleMobileMenu}
          >
            About Us
          </a>
          <a
            href="/contactus"
            className="text-xl cursive text-black dark:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
            onClick={toggleMobileMenu}
          >
            Contact Us
          </a>
          {!isLoggedIn ? (
            <>
              <a
                href="/signup"
                className="text-xl cursive text-black dark:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
                onClick={toggleMobileMenu}
              >
                Sign Up
              </a>
              <a
                href="/login"
                className="text-xl cursive text-black dark:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
                onClick={toggleMobileMenu}
              >
                Login
              </a>
            </>
          ) : (
            <>
              <p
                className="text-xl cursive text-black dark:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-red-500 dark:hover:bg-white dark:hover:text-black"
                onClick={() => {
                  handleLogoutClick();
                  toggleMobileMenu();
                }}
              >
                Logout
              </p>
              {localStorage.getItem("image") && (
                <a href="/profile" onClick={toggleMobileMenu}>
                  <Avatar
                    circle
                    size="sm"
                    src={localStorage.getItem("image")}
                  />
                </a>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
