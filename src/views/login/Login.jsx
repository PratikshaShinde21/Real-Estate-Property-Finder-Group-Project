import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import userIcon from "../../assets/user.svg";
import lockIcon from "../../assets/lock.png";
import passShowIcon from "../../assets/passShow.png";
import passHideIcon from "../../assets/passHide.png";
import googleLogo from "../../assets/GoogleLogo.png";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isLogin = mode === "login";

  // =========================================
  // LOAD REMEMBERED MOBILE NUMBER
  // =========================================
  useEffect(() => {
    const savedMobile = localStorage.getItem("rememberedMobile");

    if (savedMobile) {
      setForm((prev) => ({
        ...prev,
        mobile: savedMobile,
      }));

      setRememberMe(true);
    }
  }, []);

  // =========================================
  // HANDLE INPUT CHANGE
  // =========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile number - only numbers
    if (name === "mobile") {
      const onlyNumbers = value.replace(/\D/g, "");

      if (onlyNumbers.length <= 10) {
        setForm((prev) => ({
          ...prev,
          mobile: onlyNumbers,
        }));
      }

      setErrors((prev) => ({
        ...prev,
        mobile: "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================================
  // VALIDATION
  // =========================================
  const validate = () => {
    const next = {};

    if (!isLogin && !form.name.trim()) {
      next.name = "Please enter your name";
    }

    if (!form.mobile.trim()) {
      next.mobile = "Please enter your mobile number";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      next.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!form.password) {
      next.password = "Please enter a password";
    } else if (form.password.length < 6) {
      next.password = "Minimum 6 characters required";
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  // =========================================
  // SAVE USER
  // =========================================
  const saveUserToLocalStorage = (userData) => {
    // Current logged-in user
    localStorage.setItem(
      "currentUser",
      JSON.stringify(userData)
    );

    // Login status
    localStorage.setItem("isLoggedIn", "true");

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const alreadyExists = existingUsers.some((u) => u.email === userData.email);
    if (!alreadyExists) {
      existingUsers.push(userData);

      localStorage.setItem(
        "users",
        JSON.stringify(existingUsers)
      );
    }
  };

  // =========================================
  // LOGIN / REGISTER
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 900)
      );

      // =====================================
      // REGISTER
      // =====================================
      if (!isLogin) {
        const existingUsers = JSON.parse(
          localStorage.getItem("users") || "[]"
        );

        const mobileAlreadyExists =
          existingUsers.some(
            (user) => user.mobile === form.mobile
          );

        if (mobileAlreadyExists) {
          setErrors({
            mobile:
              "This mobile number is already registered",
          });

          return;
        }

        const userData = {
          name: form.name,
          mobile: form.mobile,
          password: form.password,
          via: "mobile",
          loggedInAt: new Date().toISOString(),
        };

        saveUserToLocalStorage(userData);

        window.dispatchEvent(
          new Event("loginStatusChanged")
        );

        alert("Registration Successful! 🎉");

        navigate("/property");

        return;
      }

      // =====================================
      // LOGIN
      // =====================================

      const existingUsers = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      const user = existingUsers.find(
        (u) =>
          u.mobile === form.mobile &&
          u.password === form.password
      );

      if (!user) {
        setErrors({
          mobile: "Invalid mobile number or password",
        });

        return;
      }

      const loggedInUser = {
        ...user,
        loggedInAt: new Date().toISOString(),
      };

      // IMPORTANT:
      // Property page uses currentUser.mobile
      saveUserToLocalStorage(loggedInUser);

      // Remember mobile
      if (rememberMe) {
        localStorage.setItem(
          "rememberedMobile",
          form.mobile
        );
      } else {
        localStorage.removeItem("rememberedMobile");
      }

      // Notify Navbar / other components
      window.dispatchEvent(
        new Event("loginStatusChanged")
      );

      alert("Login Successful! 🎉");

      navigate("/property");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================
  // SWITCH LOGIN / REGISTER
  // =========================================
  const switchMode = (next) => {
    setMode(next);
    setErrors({});
    setShowPassword(false);
  };

  // =========================================
  // GOOGLE AUTH
  // =========================================
  const handleGoogleAuth = () => {
    const googleUser = {
      name: "Google User",
      mobile: "google_" + Date.now(),
      password: "",
      via: "google",
      loggedInAt: new Date().toISOString(),
    };

    saveUserToLocalStorage(googleUser);

    window.dispatchEvent(
      new Event("loginStatusChanged")
    );

    alert(
      `${isLogin ? "Logged in" : "Signed up"} with Google`
    );

    navigate("/property");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* ======================================
            LEFT BRAND PANEL
        ====================================== */}

        <div className="auth-brand-panel">

          <div className="auth-brand-overlay" />

          <div className="auth-brand-content">

            <span className="auth-brand-small">
              Your Home, Your Choice
            </span>

            <h1>
              {isLogin
                ? "Welcome back"
                : "Get started today"}
            </h1>

            <p>
              {isLogin
                ? "Log in to access your saved properties, wishlist, and searches."
                : "Create an account and start exploring thousands of verified properties."}
            </p>

          </div>

        </div>

        {/* ======================================
            RIGHT FORM PANEL
        ====================================== */}

        <div className="auth-form-panel">

          {/* LOGIN / REGISTER TABS */}

          <div className="auth-tabs">

            <button
              type="button"
              className={`auth-tab ${isLogin ? "active" : ""
                }`}
              onClick={() =>
                switchMode("login")
              }
            >
              Login
            </button>

            <button
              type="button"
              className={`auth-tab ${!isLogin ? "active" : ""
                }`}
              onClick={() =>
                switchMode("register")
              }
            >
              Register
            </button>

            <span
              className={`auth-tab-slider ${isLogin ? "left" : "right"
                }`}
            />

          </div>

          {/* ======================================
              FORM
          ====================================== */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >

            {/* NAME - REGISTER ONLY */}

            {!isLogin && (
              <div className="auth-field">

                <label htmlFor="name">
                  Full Name
                </label>

                <div className="auth-input-wrap">

                  <img
                    src={userIcon}
                    alt=""
                    className="auth-input-icon"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                  />

                </div>

                {errors.name && (
                  <small className="auth-error">
                    {errors.name}
                  </small>
                )}

              </div>
            )}

            {/* ======================================
                MOBILE NUMBER
            ====================================== */}

            <div className="auth-field">

              <label htmlFor="mobile">
                Mobile Number
              </label>

              <div className="auth-input-wrap">

                <span
                  className="mobile-country-code"
                >
                  +91
                </span>

                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength="10"
                  placeholder="Enter mobile number"
                  value={form.mobile}
                  onChange={handleChange}
                />

              </div>

              {errors.mobile && (
                <small className="auth-error">
                  {errors.mobile}
                </small>
              )}

            </div>

            {/* ======================================
                PASSWORD
            ====================================== */}

            <div className="auth-field">

              <label htmlFor="password">
                Password
              </label>

              <div className="auth-input-wrap">

                <img
                  src={lockIcon}
                  alt=""
                  className="auth-input-icon"
                />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label="Toggle password visibility"
                >

                  <img
                    src={
                      showPassword
                        ? passHideIcon
                        : passShowIcon
                    }
                    alt=""
                    className="auth-eye-icon"
                  />

                </button>

              </div>

              {errors.password && (
                <small className="auth-error">
                  {errors.password}
                </small>
              )}

            </div>

            {/* ======================================
                CONFIRM PASSWORD
            ====================================== */}

            {!isLogin && (
              <div className="auth-field">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="auth-input-wrap">

                  <img
                    src={lockIcon}
                    alt=""
                    className="auth-input-icon"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="••••••••"
                    value={
                      form.confirmPassword
                    }
                    onChange={handleChange}
                  />

                </div>

                {errors.confirmPassword && (
                  <small className="auth-error">
                    {errors.confirmPassword}
                  </small>
                )}

              </div>
            )}

            {/* ======================================
                REMEMBER ME
            ====================================== */}

            {isLogin && (
              <div className="auth-row-between">

                <label className="auth-remember">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                  />

                  Remember me

                </label>

                <a
                  href="#forgot"
                  className="auth-link"
                >
                  Forgot password?
                </a>

              </div>
            )}

            {/* ======================================
                SUBMIT BUTTON
            ====================================== */}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={submitting}
            >

              {submitting
                ? "Processing..."
                : isLogin
                  ? "Log In"
                  : "Create Account"}

            </button>

          </form>

          {/* ======================================
              DIVIDER
          ====================================== */}

          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* ======================================
              GOOGLE BUTTON
          ====================================== */}

          <div className="auth-social-buttons">

            <button
              type="button"
              className="auth-social-btn"
              onClick={handleGoogleAuth}
            >

              <img
                src={googleLogo}
                alt="Google"
                className="auth-social-icon"
              />

              {isLogin
                ? "Log in"
                : "Sign up"}{" "}
              with Google

            </button>

          </div>

          {/* ======================================
              SWITCH LOGIN / REGISTER
          ====================================== */}

          <p className="auth-switch-text">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}

            <button
              type="button"
              className="auth-switch-link"
              onClick={() =>
                switchMode(
                  isLogin
                    ? "register"
                    : "login"
                )
              }
            >

              {isLogin
                ? "Register"
                : "Log In"}

            </button>

          </p>

        </div>

      </div>

    </div>
  );
}