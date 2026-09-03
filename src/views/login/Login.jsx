import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// Image imports
import userIcon from "../../assets/user.svg";
import gmailIcon from "../../assets/gmail.png";
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
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isLogin = mode === "login";

  // Page load - check if user previously selected "Remember me" and pre-fill email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!isLogin && !form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.password) next.password = "Please enter a password";
    else if (form.password.length < 6)
      next.password = "Minimum 6 characters required";
    if (!isLogin && form.password !== form.confirmPassword)
      next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Login/Register data localStorage save
  const saveUserToLocalStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    // registered/logged-in users
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const alreadyExists = existingUsers.some((u) => u.email === userData.email);
    if (!alreadyExists) {
      existingUsers.push(userData);
      localStorage.setItem("users", JSON.stringify(existingUsers));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 900)); // demo delay
      console.log(isLogin ? "Login data:" : "Register data:", form);

      // localStorage save
      const userData = {
        name: form.name || form.email.split("@")[0],
        email: form.email,
        via: "email",
        loggedInAt: new Date().toISOString(),
      };
      saveUserToLocalStorage(userData);

      // Remember me
      if (isLogin && rememberMe) {
        localStorage.setItem("rememberedEmail", form.email);
      } else if (isLogin && !rememberMe) {
        localStorage.removeItem("rememberedEmail");
      }
      window.dispatchEvent(new Event("loginStatusChanged"))
      navigate("/properties");
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setErrors({});
  };

  // Google login/signup button click handler
  const handleGoogleAuth = () => {
    const googleUser = {
      name: "Google User",
      email: `googleuser${Date.now()}@gmail.com`,
      via: "google",
      loggedInAt: new Date().toISOString(),
    };

    saveUserToLocalStorage(googleUser);
    console.log(
      isLogin ? "Google login successful:" : "Google signup successful:",
      googleUser,
    );

    alert(`${isLogin ? "Logged in" : "Signed up"} with Google`);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* LEFT — brand / promo panel */}
        <div className="auth-brand-panel">
          <div className="auth-brand-overlay" />
          <div className="auth-brand-content">
            <span className="auth-brand-small">Your Home, Your Choice</span>
            <h1>{isLogin ? "Welcome back" : "Get started today"}</h1>
            <p>
              {isLogin
                ? "Log in to access your saved properties, wishlist, and searches."
                : "Create an account and start exploring thousands of verified properties."}
            </p>
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className="auth-form-panel">
          {/* Toggle tabs */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={() => switchMode("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={() => switchMode("register")}
            >
              Register
            </button>
            <span className={`auth-tab-slider ${isLogin ? "left" : "right"}`} />
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="name">Full Name</label>
                <div className="auth-input-wrap">
                  <img src={userIcon} alt="" className="auth-input-icon" />
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
                  <small className="auth-error">{errors.name}</small>
                )}
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <div className="auth-input-wrap">
                <img src={gmailIcon} alt="" className="auth-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <small className="auth-error">{errors.email}</small>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrap">
                <img src={lockIcon} alt="" className="auth-input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Toggle password visibility"
                >
                  <img
                    src={showPassword ? passHideIcon : passShowIcon}
                    alt=""
                    className="auth-eye-icon"
                  />
                </button>
              </div>
              {errors.password && (
                <small className="auth-error">{errors.password}</small>
              )}
            </div>

            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="auth-input-wrap">
                  <img src={lockIcon} alt="" className="auth-input-icon" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && (
                  <small className="auth-error">{errors.confirmPassword}</small>
                )}
              </div>
            )}

            {isLogin && (
              <div className="auth-row-between">
                <label className="auth-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />{" "}
                  Remember me
                </label>
                <a href="#forgot" className="auth-link">
                  Forgot password?
                </a>
              </div>
            )}

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

          <div className="auth-divider">
            <span>or</span>
          </div>

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
              {isLogin ? "Log in" : "Sign up"} with Google
            </button>
          </div>

          <p className="auth-switch-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="auth-switch-link"
              onClick={() => switchMode(isLogin ? "register" : "login")}
            >
              {isLogin ? "Register" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}