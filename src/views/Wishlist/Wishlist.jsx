import React, { useEffect, useState } from "react";
import {
  Heart,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";

import { Link } from "react-router-dom";

import "./Wishlist.css";

const Wishlist = () => {
  const [search, setSearch] = useState("");

  const [propertyType, setPropertyType] = useState("All Properties");

  const [sortOption, setSortOption] = useState("Sort By");

  const [showFilter, setShowFilter] = useState(false);

  const [showSort, setShowSort] = useState(false);

  // =========================
  // GET WISHLIST
  // =========================

  const [wishlist, setWishlist] = useState(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      return [];
    }

    const wishlistKey =
      "wishlist_" + currentUser.mobile;

    const savedWishlist =
      localStorage.getItem(wishlistKey);

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });
  // =========================
  // FILTER
  // =========================

  const handleFilter = (type) => {
    setPropertyType(type);
    setShowFilter(false);
  };

  // =========================
  // SORT
  // =========================

  const handleSort = (option) => {
    setSortOption(option);
    setShowSort(false);
  };

  // =========================
  // REMOVE PROPERTY
  // =========================

  const removeFromWishlist = (id) => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      return;
    }

    const updatedWishlist = wishlist.filter(
      (property) => property.id !== id
    );

    setWishlist(updatedWishlist);

    const wishlistKey =
      "wishlist_" + currentUser.mobile;

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(updatedWishlist)
    );
  };

  // =========================
  // SEARCH + FILTER
  // =========================
  let displayedProperties = wishlist.filter((property) => {
    const text = search.toLowerCase();

    const matchesSearch =
      property.title?.toLowerCase().includes(text) ||
      property.name?.toLowerCase().includes(text) ||
      property.city?.toLowerCase().includes(text) ||
      property.location?.toLowerCase().includes(text);

    const type = (property.type || "").toLowerCase();
    const category = (property.category || "").toLowerCase();

    let matchesFilter;

    if (propertyType === "All Properties") {
      matchesFilter = true;
    } else if (propertyType === "House") {
      matchesFilter =
        type === "house" ||
        type === "home" ||
        category === "house" ||
        category === "home";
    } else {
      matchesFilter =
        type === propertyType.toLowerCase() ||
        category === propertyType.toLowerCase();
    }

    return matchesSearch && matchesFilter;
  });

  // =========================
  // SORT
  // =========================

  if (sortOption === "Price: Low to High") {
    displayedProperties.sort(
      (a, b) =>
        Number(a.price) - Number(b.price)
    );
  }

  if (sortOption === "Price: High to Low") {
    displayedProperties.sort(
      (a, b) =>
        Number(b.price) - Number(a.price)
    );
  }

  if (sortOption === "Newest") {
    displayedProperties.reverse();
  }

  return (
    <div className="wishlist-page">

      {/* ================= HERO SECTION ================= */}

      <section className="wishlist-hero">

        <div className="wishlist-overlay">

          <div className="wishlist-hero-content">

            <div className="hero-heart">

              <Heart
                size={28}
                fill="white"
                color="white"
              />

            </div>

            <p className="hero-label">
              YOUR SAVED PROPERTIES
            </p>

            <h1>
              My <span>Wishlist</span>
            </h1>

            <p className="hero-description">
              Save your favorite properties and find your perfect home easily.
            </p>

          </div>

        </div>

      </section>


      {/* ================= SAVED PROPERTIES ================= */}

      <section className="saved-section">

        {/* HEADING */}

        <div className="saved-header">

          <div>

            <p className="saved-label">
              MY FAVORITES
            </p>

            <h2>
              Saved Properties
            </h2>

          </div>

          <div className="property-count">

            <Heart
              size={18}
              fill="#e69a3c"
              color="#fb9314"
            />

            <span>
              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "Property"
                : "Properties"}
            </span>

          </div>

        </div>


        {/* ================= SEARCH + FILTER ================= */}

        <div className="wishlist-controls">

          {/* SEARCH */}

          <div className="search-box">

            <Search size={20} />

            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* PROPERTY FILTER */}

          <div className="dropdown-container">

            <button
              className="filter-box"
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
              }}
            >

              <SlidersHorizontal size={19} />

              <span>
                {propertyType}
              </span>

              <ChevronDown
                size={18}
                className={
                  showFilter
                    ? "rotate-icon"
                    : ""
                }
              />

            </button>


            <div
              className={`dropdown-menu ${showFilter
                  ? "show-dropdown"
                  : ""
                }`}
            >

              <button
                onClick={() =>
                  handleFilter("All Properties")
                }
              >
                All Properties
              </button>

              <button
                onClick={() =>
                  handleFilter("Apartment")
                }
              >
                Apartment
              </button>

              <button
                onClick={() =>
                  handleFilter("House")
                }
              >
                House
              </button>

              <button
                onClick={() =>
                  handleFilter("Villa")
                }
              >
                Villa
              </button>

              <button
                onClick={() =>
                  handleFilter("Plot")
                }
              >
                Plot
              </button>

            </div>

          </div>


          {/* SORT */}

          <div className="dropdown-container">

            <button
              className="sort-box"
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
            >

              <span>
                {sortOption}
              </span>

              <ChevronDown
                size={18}
                className={
                  showSort
                    ? "rotate-icon"
                    : ""
                }
              />

            </button>


            <div
              className={`dropdown-menu sort-dropdown ${showSort
                  ? "show-dropdown"
                  : ""
                }`}
            >

              <button
                onClick={() =>
                  handleSort("Newest")
                }
              >
                Newest
              </button>

              <button
                onClick={() =>
                  handleSort(
                    "Price: Low to High"
                  )
                }
              >
                Price: Low to High
              </button>

              <button
                onClick={() =>
                  handleSort(
                    "Price: High to Low"
                  )
                }
              >
                Price: High to Low
              </button>

            </div>

          </div>

        </div>


        {/* ================= SAVED PROPERTY CARDS ================= */}

        {displayedProperties.length > 0 ? (

          <div className="wishlist-properties">

            {displayedProperties.map((property) => (

              <div
                className="wishlist-property-card"
                key={property.id}
              >

                <div className="wishlist-property-image">

                  <img
                    src={property.image || property.images?.[0]}
                    alt={property.title || property.name || "Property"}
                  />

                  <button
                    className="wishlist-remove-btn"
                    onClick={() =>
                      removeFromWishlist(property.id)
                    }
                  >
                    <Heart
                      size={20}
                      fill="#e75b67"
                      color="#e75b67"
                    />
                  </button>

                </div>


                <div className="wishlist-property-info">

                  <p className="wishlist-property-type">
                    {property.type || property.category}
                  </p>

                  <h3>
                    {property.title ||
                      property.name}
                  </h3>

                  <p className="wishlist-location">
                    <FaLocationDot />
                    {property.city ||
                      property.name?.split(" in ").pop() ||
                      "Location"}
                  </p>

                  <strong>
                    {property.price}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* ================= EMPTY WISHLIST ================= */

          <div className="empty-wishlist-card">

            <div className="empty-heart">

              <Heart
                size={58}
                color="#e75b67"
                strokeWidth={2}
              />

            </div>

            <h3>
              Your Wishlist is Empty
            </h3>

            <p>
              Explore properties and save your favorite ones here.
            </p>

            <Link
              to="/property"
              className="browse-btn"
            >

              Browse Properties

              <ArrowRight size={21} />

            </Link>

          </div>

        )}

      </section>

    </div>
  );
};

export default Wishlist;