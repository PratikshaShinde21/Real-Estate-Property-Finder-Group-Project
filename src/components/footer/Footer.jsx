import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FiHome, FiMapPin, FiPhoneCall, FiMessageCircle } from "react-icons/fi";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">

          <h2>  <FiHome /> <span> NestFinder </span>  </h2>

          <p>  Find your dream home with trusted properties,
            better locations and a simple property search.
          </p>
        </div>


        {/* Quick Links */}
        <div className="footer-column">

          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/card">Card</Link>

        </div>

        {/* Customer Service */}
        <div className="footer-column">

          <h3>Popular Cities</h3>
          <Link to="/properties">Mumbai</Link>
          <Link to="/properties">Pune</Link>
          <Link to="/properties">Nashik</Link>
          <Link to="/properties">Nagpur</Link>

        </div>
        {/* Contact */}
        <div className="footer-column contact-column">

          <h3>Contact Us</h3>

          <a href="mailto:tanishkaadhav30@gmail.com">
            <FiMessageCircle />
            Email Us</a>

          <a href="tel:+919209039114"><FiPhoneCall /> Call Us</a>

          <a href="https://maps.app.goo.gl/Ece1sgJRdGnsWjRR9" target="_blank" rel="noopener noreferrer">
            <FiMapPin /> Location
          </a>

        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © 2026 NestFinder. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;