import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

import {
  FiHome,
  FiHeart,
  FiInfo,
  FiLogIn,
  FiLogOut,
  FiShoppingCart,
  FiMenu,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { LiaFighterJetSolid } from "react-icons/lia";

function Navbar() {
  const navigate = useNavigate();

  // =========================
  // HAMBURGER MENU
  // =========================
  const [menuOpen, setMenuOpen] = useState(false);

  // =========================
  // DARK / LIGHT MODE
  // =========================
  const [darkMode, setDarkMode] = useState(false);

  // =========================
  // LOGIN STATUS
  // =========================
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // =========================
  // CHECK LOGIN STATUS
  // =========================
  useEffect(() => {
    const updateLoginStatus = () => {
      const loggedIn =
        localStorage.getItem("isLoggedIn") === "true";

      setIsLoggedIn(loggedIn);
    };

    // Initial check
    updateLoginStatus();


    window.addEventListener(
      "loginStatusChanged",
      updateLoginStatus
    );

    return () => {
      window.removeEventListener(
        "loginStatusChanged",
        updateLoginStatus
      );
    };
  }, []);

  // =========================
  // DAY / NIGHT
  // =========================
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;

      document.body.classList.toggle(
        "dark-mode",
        newMode
      );

      return newMode;
    });
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    // Login information remove
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);

    // Menu close
    setMenuOpen(false);


    navigate("/login");
  };

  // =========================
  // CLOSE MENU
  // =========================
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* ================= LOGO ================= */}

      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        <FiHome />
        NestFinder
      </div>

      {/* ================= DESKTOP MENU ================= */}

      <div className="navbar-links">

        <button
          onClick={() => navigate("/")}
        >
          <FiHome />
          Home
        </button>

        <button
          onClick={() => navigate("/property")}
        >
          <FiHome />
          Property
        </button>

        <button
          onClick={() => navigate("/wishlist")}
        >
          <FiHeart />
          Wishlist
        </button>

        <button
          onClick={() => navigate("/about")}
        >
          <FiInfo />
          About
        </button>


        <button
          onClick={() => navigate("/cart")}
        >
          <FiShoppingCart />
          Cart
        </button>


        {/* ================= LOGIN / LOGOUT ================= */}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
          >
            <FiLogOut />
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
          >
            <FiLogIn />
            Login
          </button>
        )}

        {/* ================= THEME ================= */}

        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <FiSun />
          ) : (
            <FiMoon />
          )}
        </button>

      </div>

      {/* ================= HAMBURGER ================= */}

      <button
        className="hamburger-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <FiHome />
        ) : (
          <FiMenu />
        )}
      </button>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`mobile-menu ${menuOpen
          ? "mobile-menu-open"
          : ""
          }`}
      >

        <button
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
        >
          <FiHome />
          Home
        </button>

        <button
          onClick={() => {
            navigate("/property");
            closeMenu();
          }}
        >
          <FiHome />
          Property
        </button>

        <button
          onClick={() => {
            navigate("/cart");
            closeMenu();
          }}
        >
          <FiShoppingCart />
          Cart
        </button>

        <button
          onClick={() => {
            navigate("/wishlist");
            closeMenu();
          }}
        >
          <FiHeart />
          Wishlist
        </button>

        <button
          onClick={() => {
            navigate("/about");
            closeMenu();
          }}
        >
          <FiInfo />
          About
        </button>

        {/* ================= MOBILE LOGIN / LOGOUT ================= */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
          >
            <FiLogOut />
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              closeMenu();
            }}
          >
            <FiLogIn />
            Login
          </button>
        )}

        {/* ================= MOBILE THEME ================= */}

        <button
          className="mobile-theme-btn"
          onClick={toggleTheme}
        >

          {darkMode
            ? <FiSun />
            : <FiMoon />}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;