import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiMapPin,
  FiHome,
  FiDollarSign,
  FiSliders,
  FiSearch,
  FiStar,
  FiHeart,
  FiMessageCircle,
  FiHeadphones
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

{/* NAVBAR */ }

export function Navbar() {
  c
  const navigate = useNavigate();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) return;

    const wishlistKey = "wishlist_" + user.mobile;

    const wishlist =
      JSON.parse(localStorage.getItem(wishlistKey)) || [];

    setIsWishlisted(
      wishlist.some((item) => item.id === id)
    );
  }, [id]);

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;

      document.body.classList.toggle("dark-mode", newMode);

      return newMode;
    });
  };

  return (
    <nav className="navbar">

      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        NestFinder
      </div>

      <div className="navbar-links">

        <button onClick={() => navigate("/")}>
          Home
        </button>

        <button onClick={() => navigate("/property")}>
          Properties
        </button>

        <button>About</button>

        <button>Contact</button>

        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

      </div>

    </nav>
  );
}

// HERO SLIDER  // 

export function HeroSlider({ slides }) {

  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  // useEffect - Auto Slider
  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentSlide(
        (prev) => (prev + 1) % slides.length
      );

    }, 4000);

    return () => clearInterval(timer);

  }, [slides.length]);

  // Previous
  const previousSlide = () => {

    setCurrentSlide(
      (prev) =>
        (prev - 1 + slides.length) % slides.length
    );
  };

  // Next
  const nextSlide = () => {

    setCurrentSlide(
      (prev) =>
        (prev + 1) % slides.length
    );

  };


  return (
    <section
      className="hero"
      style={{
        backgroundImage:
          `url(${slides[currentSlide].image})`
      }}
    >
      <div className="hero-overlay"></div>

      {/* Previous */}
      <button
        className="slider-btn prev-btn"
        onClick={previousSlide}
      >
        &#10094;
      </button>

      {/* Next */}
      <button
        className="slider-btn next-btn"
        onClick={nextSlide}
      >
        &#10095;
      </button>

      {/* Hero Content */}
      <div className="hero-content">

        <p className="hero-small-text">
          FIND YOUR PERFECT PLACE
        </p>

        <h1>
          {slides[currentSlide].title.split(" ").slice(0, -1).join(" ")}{" "}
          <span>
            {slides[currentSlide].title.split(" ").slice(-1).join(" ")}
          </span>
        </h1>
        <p className="hero-description">
          Discover beautiful properties in the best
          locations and find a place that truly feels
          like home.
        </p>

        {/* PROPERTY SEARCH */}

        <div className="hero-filter-bar">

          <div className="filter-item">
            <FiMapPin />
            <select>
              <option>Area</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Nashik</option>
            </select>
          </div>

          <div className="filter-item">
            <FiHome />
            <select>
              <option>Layout</option>
              <option>1 BHK</option>
              <option>2 BHK</option>
              <option>3 BHK</option>
            </select>
          </div>

          <div className="filter-item">
            <FiDollarSign />
            <select>
              <option>Max Rent</option>
              <option>₹10,000</option>
              <option>₹20,000</option>
              <option>₹30,000</option>
            </select>
          </div>

          <div className="filter-item">
            <FiSliders />
            <select>
              <option>Features</option>
              <option>Parking</option>
              <option>Furnished</option>
              <option>Swimming Pool</option>
            </select>
          </div>

          <button
            className="hero-search-btn"
            onClick={() => navigate("/property")}
          >
            <FiSearch />
            Search
          </button>

        </div>

        {/* Rating */}
        <div className="trust-section">

          <div className="rating">

            <span className="stars">
              <FiStar />  <FiStar />  <FiStar /> <FiStar />  <FiStar />
            </span>

            <div>
              <strong>4.8/5</strong>

              <p>
                Customer Rating
              </p>
            </div>

          </div>

          <div className="divider"></div>

          <div className="trusted">
            <strong>4K+</strong>
            <p>
              Trusted People
            </p>
          </div>
        </div>
      </div>


      {/* Slider Dots */}
      <div className="slider-dots">

        {slides.map((slide, index) => (

          <button
            key={index}
            className={
              `dot ${currentSlide === index
                ? "active"
                : ""
              }`
            }
            onClick={() =>
              setCurrentSlide(index)
            }
            aria-label={
              `Go to slide ${index + 1}`
            }
          ></button>
        ))}
      </div>
    </section>
  );
}


// ==================// CITY CARD // ==================

export function CityCard({
  name,
  image,
  properties,
  price,
  large,
  wikipedia
}) {

  const navigate = useNavigate();

  return (
    <div
      className={
        `city-card ${large ? "city-large" : ""
        }`
      }
    >

      <img
        src={image}
        alt={name} />

      <div className="city-overlay"></div>
      <div className="city-content">

        <h3> {name} </h3>
        <h4> {properties} </h4>
        <p> {price} </p>

        <a
          href={wikipedia}
          target="_blank"
          rel="noopener noreferrer"
          className="explore-btn"
        >
          <FiSearch /> Explore
        </a>
      </div>
    </div>
  );
}
export function PropertyCard({
  id,
  image,
  title,
  type,
  city,
  price,
  rating,
}) {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!user) return;

    const wishlistKey = "wishlist_" + user.mobile;

    const wishlist =
      JSON.parse(localStorage.getItem(wishlistKey)) || [];

    setIsWishlisted(
      wishlist.some((item) => item.id === id)
    );
  }, [id]);
  const handleWishlist = () => {
    const user = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!user) {
      alert("Please login first to add property to Wishlist.");
      navigate("/login");
      return;
    }

    const wishlistKey = "wishlist_" + user.mobile;

    const wishlist =
      JSON.parse(localStorage.getItem(wishlistKey)) || [];

    const property = {
      id,
      image,
      title,
      type,
      city,
      price,
      rating,
    };

    const alreadyAdded = wishlist.some(
      (item) => item.id === id
    );

    if (alreadyAdded) {
      const updatedWishlist = wishlist.filter(
        (item) => item.id !== id
      );
      localStorage.setItem(
        wishlistKey,
        JSON.stringify(updatedWishlist)
      );

      setIsWishlisted(false);

      alert("Removed from Wishlist.");
      return;
    }

    const updatedWishlist = [
      ...wishlist,
      property,
    ];
    localStorage.setItem(
      wishlistKey,
      JSON.stringify(updatedWishlist)
    );

    setIsWishlisted(true);

    alert("Successfully added to Wishlist ❤️");
  };

  return (
    <div className="property-card">

      <div className="property-image-container">
        <img
          src={image}
          alt={title}
          className="property-image"
        />

        <button
          className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""
            }`}
          onClick={handleWishlist}
          aria-label="Add to Wishlist"
        >
          {isWishlisted ? (
            <FaHeart
              className="wishlist-heart"
              color="#dc2626"
            />
          ) : (
            <FiHeart
              className="wishlist-heart"
              color="#5f3c3c"
            />
          )}
        </button>
      </div>

      <div className="property-content">
        <h3>{title}</h3>

        <div className="property-meta">
          <p className="property-type">
            {type}
          </p>

          <p className="property-city">
            <FiMapPin />
            {city}
          </p>
          <p className="property-rating">
            ⭐ {rating}
          </p>

        </div>

        <p className="property-price">
          Price :  {price}
        </p>

        <button
          className="view-details-btn"
          onClick={handleWishlist}
        >
          Add to wishlist
        </button>
      </div>

    </div>
  );
}

// SEARCH FROM MAP // 

export function SearchFromMap({
  propertyTypes,
  mapProperties,
}) {

  const navigate = useNavigate();

  const [location, setLocation] = useState("");

  const [propertyType, setPropertyType] = useState("");

  // Form submit
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/property?location=${location}&type=${propertyType}`
    );

  };

  return (
    <section className="search-map-section">

      <div className="search-map-content">

        {/* LEFT */}
        <div className="map-text">

          <p className="map-subtitle">
            FIND YOUR PERFECT LOCATION
          </p>

          <h2>
            Search <span style={{ color: "#ff8533" }}> from Map </span>
          </h2>

          <p className="map-description">
            Explore properties around your preferred
            location and find your perfect place with ease.
          </p>

          <form
            className="map-search-box"
            onSubmit={handleSearch}
          >

            {/* Location */}
            <div className="location-input">

              <input
                type="text"
                placeholder="Search location..."
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

            </div>

            {/* Property Type */}
            <select
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value)
              }
            >

              <option value="">
                Property Type
              </option>

              {propertyTypes.map((type) => (

                <option
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </option>

              ))}

            </select>
            <button
              className="map-search-btn"
              type="submit"
            >
              <span className="starss" > <FiSearch /> </span>
              Search Properties

            </button>

          </form>
        </div>

        {/* RIGHT MAP */}
        <div className="map-preview">

          <MapContainer
            center={[19.0760, 72.8777]}
            zoom={6}
            scrollWheelZoom={false}
            style={{
              width: "100%",
              height: "100%",
            }}
          >

            <TileLayer
              attribution='&copy;OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
            />
            {/* Mumbai */}
            <Marker position={[19.0760, 72.8777]}>
              <Popup>
                <strong>Mumbai</strong>
                <br />
                Properties Available
              </Popup>
            </Marker>

            {/* Pune */}
            <Marker position={[18.5204, 73.8567]}>
              <Popup>
                <strong>Pune</strong>
                <br />
                Properties Available
              </Popup>
            </Marker>

            {/* Nashik */}
            <Marker position={[19.9975, 73.7898]}>
              <Popup>
                <strong>Nashik</strong>
                <br />
                Properties Available
              </Popup>
            </Marker>

          </MapContainer>

        </div>
      </div>
    </section>
  );
}

// WHY CARD//
const iconMap = {
  home: <FiHome />,
  search: <FiSearch />,
  support: <FiHeadphones />,
  value: <FiDollarSign />
}
export function WhyCard({
  icon,
  title,
  description,
}) {

  return (

    <div className="why-card">

      <div className="why-icon">
        {iconMap[icon] || icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

    </div>
  );
}