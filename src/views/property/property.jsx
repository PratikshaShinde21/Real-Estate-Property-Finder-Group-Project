import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MapContainer,
    TileLayer
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
    FaHouse,
    FaHouseChimney,
    FaBuilding,
    FaKey,
    FaShieldHeart,
    FaMagnifyingGlass,
    FaLocationDot,
    FaCompass,
    FaArrowRight,
    FaHandshake
} from "react-icons/fa6";
import {
    FaRegHeart,
    FaHeart
} from "react-icons/fa";
import properties from "./../../data/property-data";
import "./property.css";
function Property() {
    const navigate = useNavigate();
    const [displayedProperties, setDisplayedProperties] =
        useState([]);
    const [search, setSearch] =
        useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("home");
    const [wishlist, setWishlist] =
        useState([]);
    useEffect(() => {
        const currentUser =
            JSON.parse(
                localStorage.getItem("currentUser")
            );
        if (!currentUser) {
            setWishlist([]);
            return;
        }
        const wishlistKey =
            "wishlist_" +
            currentUser.email;
        const savedWishlist =
            JSON.parse(
                localStorage.getItem(
                    wishlistKey
                )
            ) || [];
        setWishlist(
            savedWishlist
        );
    }, []);
    useEffect(() => {
        const category =
            localStorage.getItem(
                "selectedCategory"
            );
        if (category) {
            setSelectedCategory(
                category
            );
            localStorage.removeItem(
                "selectedCategory"
            );
        }
    }, []);
    useEffect(() => {

        let result = [...properties];

        const keyword = search.trim().toLowerCase();

        // SEARCH HAS PRIORITY
        if (keyword !== "") {

            result = result.filter(property => {

                const name =
                    property.name?.toLowerCase() || "";

                const description =
                    property.description?.toLowerCase() || "";

                const category =
                    property.category?.toLowerCase() || "";

                return (
                    name.includes(keyword) ||
                    description.includes(keyword) ||
                    category.includes(keyword)
                );

            });

        }

        // CATEGORY FILTER ONLY WHEN NOT SEARCHING
        else if (selectedCategory !== "all") {

            result = result.filter(property =>
                property.category?.toLowerCase() ===
                selectedCategory?.toLowerCase()
            );

        }

        setDisplayedProperties(result);

    }, [selectedCategory, search]);
    const showProperties = (
        category
    ) => {
        setSelectedCategory(
            category
        );
    };
    const isWishlisted = (
        id
    ) => {
        return wishlist.some(
            item =>
                item.id === id
        );
    };
    const toggleWishlist = (
        id
    ) => {
        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "currentUser"
                )
            );
        if (!currentUser) {
            alert(
                "Please Login First"
            );
            navigate(
                "/login"
            );
            return;
        }
        const wishlistKey =
            "wishlist_" +
            currentUser.mobile;
        let updatedWishlist =
            [...wishlist];
        const exists =
            updatedWishlist.some(
                item =>
                    item.id === id
            );
        if (exists) {
            updatedWishlist =
                updatedWishlist.filter(
                    item =>
                        item.id !== id
                );
            alert(
                "Removed From Wishlist 💔"
            );
        }
        else {
            const property =
                properties.find(
                    item =>
                        item.id === id
                );
            if (!property) {
                return;
            }
            updatedWishlist.push(
                property
            );
            alert(
                "Added To Wishlist ❤️"
            );
        }
        localStorage.setItem(
            wishlistKey,
            JSON.stringify(
                updatedWishlist
            )
        );
        setWishlist(
            updatedWishlist
        );
    };
    const viewDetails = (
        id
    ) => {
        localStorage.setItem(
            "selectedProperty",
            id
        );
        navigate(
            "/property-detail"
        );
    };
    const addToCart = (
        id
    ) => {
        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "currentUser"
                )
            );
        if (!currentUser) {
            alert(
                "Please Login First"
            );
            navigate(
                "/login"
            );
            return;
        }
        const cartKey =
            "cart_" +
            currentUser.mobile;
        let cart =
            JSON.parse(
                localStorage.getItem(
                    cartKey
                )
            ) || [];
        const property =
            properties.find(
                item =>
                    item.id === id
            );
        if (!property) {
            return;
        }
        const alreadyExists =
            cart.some(
                item =>
                    item.id === id
            );
        if (alreadyExists) {
            alert(
                "Property Already In Cart 🛒"
            );
            navigate(
                "/cart"
            );
            return;
        }
        cart.push(
            property
        );
        localStorage.setItem(
            cartKey,
            JSON.stringify(
                cart
            )
        );
        alert(
            property.name +
            " Added To Cart 🛒"
        );
        navigate(
            "/cart"
        );
    };




    return (
        <div className="property-page">

            <div className="property-header">

                {/* ================================
                LEFT CONTENT
            ================================= */}

                <div className="property-header-content">

                    <span className="property-header-label">
                        <FaHouseChimney />
                        NESTFINDER • PROPERTY COLLECTION
                    </span>

                    <h1>
                        Find Your
                        <span>Perfect Property</span>
                    </h1>

                    <p>
                        Discover beautiful homes, villas and apartments
                        in locations you'll love.
                    </p>


                    {/* STATS */}

                    <div className="property-header-stats">

                        <div className="header-stat">
                            <div className="header-stat-icon">
                                <FaHouse />
                            </div>

                            <div>
                                <strong>100+</strong>
                                <span>Properties</span>
                            </div>
                        </div>


                        <div className="header-stat">
                            <div className="header-stat-icon">
                                <FaLocationDot />
                            </div>

                            <div>
                                <strong>8+</strong>
                                <span>Locations</span>
                            </div>
                        </div>


                        <div className="header-stat">
                            <div className="header-stat-icon">
                                <FaShieldHeart />
                            </div>

                            <div>
                                <strong>100%</strong>
                                <span>Trusted</span>
                            </div>
                        </div>

                    </div>

                </div>


                {/* ================================
                RIGHT SIDE VISUAL
            ================================= */}

                <div className="property-header-visual">

                    {/* Main visual */}

                    <div className="property-visual-image">

                        <div className="visual-overlay"></div>

                        <div className="visual-property-text">
                            <span>DISCOVER</span>
                            <strong>Your Next Home</strong>
                        </div>

                    </div>


                    {/* White information panel */}

                    <div className="property-info-panel">

                        <h2>Explore</h2>


                        <div className="property-info-item">

                            <div className="property-info-icon">
                                <FaHouse />
                            </div>

                            <div>
                                <strong>Beautiful Homes</strong>
                                <span>Comfortable & modern</span>
                            </div>

                        </div>


                        <div className="property-info-item">

                            <div className="property-info-icon">
                                <FaBuilding />
                            </div>

                            <div>
                                <strong>Premium Apartments</strong>
                                <span>Prime locations</span>
                            </div>

                        </div>


                        <div className="property-info-item">

                            <div className="property-info-icon">
                                <FaHouseChimney />
                            </div>

                            <div>
                                <strong>Luxury Villas</strong>
                                <span>Space & elegance</span>
                            </div>

                        </div>


                        <div className="property-info-item">

                            <div className="property-info-icon">
                                <FaLocationDot />
                            </div>

                            <div>
                                <strong>Best Locations</strong>
                                <span>Find your perfect area</span>
                            </div>

                        </div>

                    </div>


                    {/* ================================
                    WISHLIST BUTTON
                ================================= */}

                    <button
                        className="wishlist-page-btn"
                        onClick={() => navigate("/wishlist")}
                    >
                        <FaHeart />
                        <span>Wishlist</span>
                    </button>

                </div>

            </div>

            <section className="why-nestfinder">

                <div className="why-nestfinder-header">
                    <span className="why-label">
                        WHY CHOOSE NESTFINDER?
                    </span>

                    <h2>
                        Making Property Search
                        <span> Simple &amp; Smarter</span>
                    </h2>

                    <p>
                        Find your dream property with confidence,
                        convenience and trusted information.
                    </p>
                </div>

                <div className="why-nestfinder-grid">

                    <div className="why-feature">
                        <div className="why-icon">
                            <FaShieldHeart />
                        </div>

                        <div>
                            <h3>Trusted Properties</h3>
                            <p>
                                Explore carefully listed properties
                                from trusted sources.
                            </p>
                        </div>
                    </div>

                    <div className="why-feature">
                        <div className="why-icon">
                            <FaMagnifyingGlass />
                        </div>

                        <div>
                            <h3>Easy Property Search</h3>
                            <p>
                                Quickly discover homes that match
                                your needs and preferences.
                            </p>
                        </div>
                    </div>

                    <div className="why-feature">
                        <div className="why-icon">
                            <FaLocationDot />
                        </div>

                        <div>
                            <h3>Prime Locations</h3>
                            <p>
                                Discover properties across popular
                                and convenient locations.
                            </p>
                        </div>
                    </div>

                    <div className="why-feature">
                        <div className="why-icon">
                            <FaHandshake />
                        </div>

                        <div>
                            <h3>Simple &amp; Reliable</h3>
                            <p>
                                A smooth property experience from
                                discovery to decision.
                            </p>
                        </div>
                    </div>

                </div>

            </section>
            {/* =================================================
                SEARCH
            ================================================= */}
            <div className="property-search">
                <input
                    type="text"
                    placeholder="Search property..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />
            </div>{/* =================================================
    WHY CHOOSE NESTFINDER
================================================= */}

            {/* =================================================
                CATEGORY BUTTONS
            ================================================= */}

            <div className="category-buttons">
                <button
                    className={
                        selectedCategory === "home"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        showProperties("home")
                    }
                >
                    <FaHouse />
                    <span>
                        Home
                    </span>
                </button>
                <button
                    className={
                        selectedCategory === "villa"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        showProperties("villa")
                    }
                >
                    <FaHouseChimney />
                    <span>
                        Villa
                    </span>
                </button>
                <button
                    className={
                        selectedCategory === "apartment"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        showProperties("apartment")
                    }
                >
                    <FaBuilding />
                    <span>
                        Apartment
                    </span>
                </button>
                <button
                    className={
                        selectedCategory === "rent"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        showProperties("rent")
                    }
                >
                    <FaKey />
                    <span>
                        Rent
                    </span>
                </button>
            </div>
            {/* =================================================
                PROPERTY GRID
            ================================================= */}
            <div className="property-grid">
                { }
                {displayedProperties.length === 0 && (
                    <div className="no-properties">
                        <h2>
                            No Properties Found
                        </h2>
                        <p>
                            Try another search or category.
                        </p>
                    </div>
                )}
                { }
                {displayedProperties.map(
                    property => {
                        let discount = 0;
                        if (
                            property.originalPrice &&
                            property.price
                        ) {
                            discount =
                                Math.round(
                                    (
                                        property.originalPrice -
                                        property.price
                                    )
                                    /
                                    property.originalPrice
                                    *
                                    100
                                );
                        }
                        const wishlisted =
                            isWishlisted(
                                property.id
                            );
                        return (
                            <div
                                className="property-card"
                                key={
                                    property.id
                                }
                            >
                                {/* =================================
                                    IMAGE
                                ================================= */}
                                <div className="property-image-container">
                                    <img
                                        src={
                                            property.images?.[0]
                                        }
                                        alt={
                                            property.name
                                        }
                                        className="property-image"
                                    />
                                    { }
                                    <span className="property-category">
                                        {
                                            property.category
                                        }
                                    </span>
                                    { }
                                    <button
                                        className={
                                            wishlisted
                                                ? "wishlist-btn wishlisted"
                                                : "wishlist-btn"
                                        }
                                        onClick={() =>
                                            toggleWishlist(
                                                property.id
                                            )
                                        }
                                        aria-label={
                                            wishlisted
                                                ? "Remove from wishlist"
                                                : "Add to wishlist"
                                        }
                                    >
                                        {wishlisted ? (
                                            <FaHeart className="wishlist-heart filled" />
                                        ) : (
                                            <FaRegHeart className="wishlist-heart" />
                                        )}
                                    </button>
                                </div>
                                {/* =================================
                                    CARD CONTENT
                                ================================= */}
                                <div className="property-card-content">
                                    <h2>
                                        {
                                            property.name
                                        }
                                    </h2>
                                    <p className="property-description">
                                        {
                                            property.description
                                        }
                                    </p>
                                    {/* =================================
                                        PRICE
                                    ================================= */}
                                    <div className="price-box">Price :
                                        {property.originalPrice && (
                                            <del>
                                                ₹
                                                {
                                                    property.originalPrice
                                                        .toLocaleString()
                                                }
                                            </del>
                                        )}
                                        <span className="new-price">
                                            ₹
                                            {
                                                property.price
                                                    .toLocaleString()
                                            }
                                        </span>
                                        {discount > 0 && (
                                            <span className="discount">
                                                {
                                                    discount
                                                }
                                                % OFF
                                            </span>
                                        )}
                                    </div>
                                    {/* =================================
                                        BUTTONS
                                    ================================= */}
                                    <div className="property-buttons">
                                        { }
                                        <button
                                            className="view-details-btn"
                                            onClick={() =>
                                                viewDetails(
                                                    property.id
                                                )
                                            }
                                        >
                                            View Details
                                        </button>
                                        { }
                                        <button
                                            className="cart-btn"
                                            onClick={() =>
                                                addToCart(
                                                    property.id
                                                )
                                            }
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
            {/* =====================================================
    EXPLORE LOCATIONS
===================================================== */}

            <section className="explore-location-section">

                {/* LEFT - MAP */}
                <div className="location-map-wrapper">

                    <div className="location-map-header">
                        <div>
                            <span className="location-small-label">
                                <FaLocationDot />
                                DISCOVER LOCATIONS
                            </span>

                            <h2>Find Properties Near You</h2>
                        </div>

                        <div className="map-property-count">
                            <FaHouse />
                            <span>100+ Properties</span>
                        </div>
                    </div>

                    <div className="location-map">
                        <MapContainer
                            center={[18.5204, 73.8567]}
                            zoom={11}
                            scrollWheelZoom={false}
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* Your existing property markers can stay here */}
                        </MapContainer>
                    </div>

                </div>


                {/* RIGHT - CONTENT */}
                <div className="location-info">

                    <span className="location-small-label">
                        <FaCompass />
                        EXPLORE THE CITY
                    </span>

                    <h2>
                        Explore
                        <span>Popular Locations</span>
                    </h2>

                    <p className="location-description">
                        Discover beautiful properties in some of the
                        most desirable and well-connected locations.
                    </p>


                    {/* LOCATIONS */}
                    <div className="popular-location-list">

                        <button className="popular-location-item">
                            <div className="location-item-icon">
                                <FaLocationDot />
                            </div>

                            <div>
                                <strong>Pune</strong>
                                <span>45+ Properties</span>
                            </div>

                            <FaArrowRight />
                        </button>


                        <button className="popular-location-item">
                            <div className="location-item-icon">
                                <FaLocationDot />
                            </div>

                            <div>
                                <strong>Mumbai</strong>
                                <span>30+ Properties</span>
                            </div>

                            <FaArrowRight />
                        </button>


                        <button className="popular-location-item">
                            <div className="location-item-icon">
                                <FaLocationDot />
                            </div>

                            <div>
                                <strong>Nashik</strong>
                                <span>18+ Properties</span>
                            </div>

                            <FaArrowRight />
                        </button>


                        <button className="popular-location-item">
                            <div className="location-item-icon">
                                <FaLocationDot />
                            </div>

                            <div>
                                <strong>Nagpur</strong>
                                <span>12+ Properties</span>
                            </div>

                            <FaArrowRight />
                        </button>

                    </div>


                    {/* STATS */}


                </div>

            </section>
        </div>
    );
}
export default Property;