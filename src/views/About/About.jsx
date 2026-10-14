import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import { useEffect } from "react";

import TeamCard from "../../components/TeamCard/TeamCard";

import member1 from "../../assets/member1.jpg";
import member2 from "../../assets/member2.jpg";
import member3 from "../../assets/member3.jpg";
import member4 from "../../assets/member4.jpg";

import {
  Search,
  Heart,
  ShieldCheck,
  Smartphone,
  Home,
  Zap,
  Users,
  Phone,
  MapPin,
  Mail,
  Send,
  ShoppingCart,
  ArrowRight,

} from "lucide-react";

const About = () => {

  useEffect(() => {
    if (window.location.hash === "#consultation") {
      document.getElementById("consultation")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  return (

    <div className="about-page">

      <section className="about-hero">

        <div className="about-hero-content">

          <span className="about-badge">
            🏠 Welcome to HomeFinder
          </span>

          <h1>
            Find a Place You'll
            <span> Love to Live</span>
          </h1>

          <p>
            HomeFinder makes it simple to discover,
            compare and save properties that match
            your lifestyle and budget.
          </p>

          <Link to="/property" className="about-btn">
            Explore Properties
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

      <section className="about-intro">

        <div className="about-image-box">
          <div className="about-image-card">
            🏡
          </div>
        </div>

        <div className="about-text">

          <span className="section-label">
            ABOUT US
          </span>

          <h2>
            Your Trusted Property
            <span> Finding Partner</span>
          </h2>

          <p>
            HomeFinder is a modern real estate platform
            designed to make property searching easier,
            faster and more convenient.
          </p>

          <p>
            Whether you are looking to buy, rent or list
            a property, our platform helps you find useful
            property information in one place.
          </p>

          <div className="about-features">

            <div className="feature-item">

              <div className="feature-icon">
                <Search size={22} />
              </div>

              <div>
                <h3>Easy Search</h3>

                <p>
                  Find properties using simple filters.
                </p>
              </div>

            </div>

            <div className="feature-item">

              <div className="feature-icon">
                <Heart size={22} />
              </div>

              <div>
                <h3>Save Favorites</h3>

                <p>
                  Add properties to your wishlist.
                </p>
              </div>

            </div>

            <div className="feature-item">

              <div className="feature-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3>Trusted Listings</h3>

                <p>
                  Get useful property information.
                </p>
              </div>

            </div>

            <div className="feature-item">

              <div className="feature-icon">
                <Smartphone size={22} />
              </div>

              <div>
                <h3>Responsive Design</h3>

                <p>
                  Use the platform on any device.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="about-stats">

        <div className="stat-card">
          <h2>500+</h2>
          <p>Properties Listed</p>
        </div>

        <div className="stat-card">
          <h2>250+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-card">
          <h2>50+</h2>
          <p>Locations</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Customer Support</p>
        </div>

      </section>

      <section className="why-us">

        <div className="why-heading">

          <span className="section-label">
            WHY CHOOSE US
          </span>

          <h2>
            Everything You Need to
            <span> Find Your Home</span>
          </h2>

          <p>
            We provide a simple and convenient property
            discovery experience for buyers and renters.
          </p>

        </div>

        <div className="why-cards">

          <div className="why-card">

            <div className="why-icon">
              <Home size={25} />
            </div>

            <h3>
              Wide Property Options
            </h3>

            <p>
              Explore apartments, houses, villas and
              other properties according to your needs.
            </p>

          </div>

          <div className="why-card">

            <div className="why-icon">
              <Zap size={25} />
            </div>

            <h3>
              Quick Search
            </h3>

            <p>
              Quickly find suitable properties using
              location and property type.
            </p>

          </div>

          <div className="why-card">

            <div className="why-icon">
              <Heart size={25} />
            </div>

            <h3>
              Wishlist
            </h3>

            <p>
              Save your favorite properties and
              easily find them later.
            </p>

          </div>

          <div className="why-card">

            <div className="why-icon">
              <Users size={25} />
            </div>

            <h3>
              Easy Communication
            </h3>

            <p>
              Get property details and connect with
              property owners easily.
            </p>

          </div>

        </div>

      </section>

      <section className="how-section">

        <div className="how-heading">

          <span className="section-label">
            HOW IT WORKS
          </span>

          <h2>
            Find Your Home in
            <span> 4 Simple Steps</span>
          </h2>

        </div>

        <div className="steps-container">

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              <Search size={28} />
            </div>

            <h3>
              Search
            </h3>

            <p>
              Search for properties based on
              your location and requirements.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              <Heart size={28} />
            </div>

            <h3>
              Save
            </h3>

            <p>
              Add your favorite properties
              to your wishlist.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              <Phone size={28} />
            </div>

            <h3>
              Contact
            </h3>

            <p>
              Get property details and
              contact the owner.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">
              04
            </div>

            <div className="step-icon">
              <ShoppingCart size={28} />
            </div>

            <h3>
              Add to Cart
            </h3>

            <p>
              Add your selected property
              to your cart for easy access.
            </p>

          </div>

        </div>

      </section>

      <section className="team-section">

        <div className="team-heading">

          <span className="section-label">
            OUR TEAM
          </span>

          <h2>
            Meet Our <span>Team</span>
          </h2>

          <p>
            Meet the team members who worked together
            to create our property finder platform.
          </p>

        </div>

        <div className="team-grid">

          <TeamCard
            image={member1}
            name="Tanishka Adhav"
            role="Developer"
            description="Works on developing and improving the project."
          />

          <TeamCard
            image={member2}
            name="Pratiksha Shinde"
            role="Developer"
            description="Works on developing and improving the project."
          />

          <TeamCard
            image={member3}
            name="Vedika Yadav"
            role="Developer"
            description="Works on developing and improving the project."
          />

          <TeamCard
            image={member4}
            name="Gayatri Mhase"
            role="Developer"
            description="Works on developing and improving the project."
          />

        </div>

      </section>

      <section className="contact-section" id="consultation">

        <div className="contact-heading">

          <span className="section-label">
            CONTACT US
          </span>

          <h2>
            Have Any <span>Questions?</span>
          </h2>

          <p>
            Feel free to contact us. We would love
            to hear from you.
          </p>

        </div>

        <div className="contact-container">

          <div className="contact-info">

            <h3>
              Get In Touch
            </h3>

            <p>
              Have a question about a property?
              Send us a message.
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Pune,Maharashtra"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >

              <div className="contact-icon">
                <MapPin size={22} />
              </div>

              <div>
                <h4>Location</h4>
                <p>Pune, Maharashtra</p>
              </div>

            </a>

            <a
              href="mailto:tanishkaadhav30@gmail.com"
              className="contact-item"
            >

              <div className="contact-icon">
                <Mail size={22} />
              </div>

              <div>
                <h4>Email</h4>
                <p>support@homefinder.com</p>
              </div>

            </a>

            <a
              href="tel:+919999999999"
              className="contact-item"
            >

              <div className="contact-icon">
                <Phone size={22} />
              </div>

              <div>
                <h4>Phone</h4>
                <p>+91 99999 99999</p>
              </div>

            </a>

          </div>

          <form className="contact-form">

            <div className="form-row">

              <div className="form-group">

                <label>
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                />

              </div>

              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                />

              </div>

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                />

              </div>

              <div className="form-group">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                />

              </div>

            </div>

            <div className="form-group">

              <label>
                Message
              </label>

              <textarea
                rows="5"
                placeholder="Write your message..."
              ></textarea>

            </div>

            <button
              type="submit"
              className="contact-btn"
            >
              Send Message
              <Send size={17} />
            </button>

          </form>

        </div>

      </section>

      <section className="about-cta">

        <h2>
          Ready to Find Your Dream Home?
        </h2>

        <p>
          Start exploring properties and find
          the perfect place for you.
        </p>

        <Link to="/property" className="about-btn">
          Browse Properties
          <ArrowRight size={18} />
        </Link>

      </section>

    </div>
  );
};

export default About;
