
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaCartShopping,
    FaLocationDot,
    FaTrash,
    FaArrowLeft,
    FaCreditCard,
    FaXmark,
    FaHouse,
    FaHeart,
    FaMagnifyingGlass,

} from "react-icons/fa6";


import "./cart.css";


function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    // ==========================================
    // GET CURRENT USER CART
    // ==========================================

    useEffect(() => {

        const currentUser =
            JSON.parse(
                localStorage.getItem("currentUser")
            );

        if (!currentUser) {
            setCart([]);
            return;
        }

        const cartKey =
            "cart_" + currentUser.mobile;

        const savedCart =
            JSON.parse(
                localStorage.getItem(cartKey)
            ) || [];

        setCart(savedCart);

    }, [navigate]);


    // ==========================================
    // REMOVE ONE PROPERTY
    // ==========================================

    const removeFromCart = (id) => {

        const currentUser =
            JSON.parse(
                localStorage.getItem("currentUser")
            );
        if (!currentUser) {
            alert("Please login first to remove a property.");
            navigate("/login");
            return;
        }

        const updatedCart =
            cart.filter(
                property =>
                    property.id !== id
            );

        const cartKey =
            "cart_" + currentUser.mobile;

        localStorage.setItem(
            cartKey,
            JSON.stringify(updatedCart)
        );

        setCart(updatedCart);

    };


    // ==========================================
    // BUY NOW
    // ==========================================

    const buyNow = (property) => {
        const currentUser =
            JSON.parse(localStorage.getItem("currentUser"));

        if (!currentUser) {
            alert("Please login first to purchase a property.");
            navigate("/login");
            return;
        }

        alert(`${property.name} purchased successfully! 🎉`);
    };


    // ==========================================
    // CANCEL ORDER
    // ==========================================
    const cancelOrder = () => {

        const currentUser =
            JSON.parse(
                localStorage.getItem("currentUser")
            );

        if (!currentUser) {
            alert("Please login first to cancel your order.");
            navigate("/login");
            return;
        }

        const cartKey =
            "cart_" + currentUser.mobile;

        localStorage.removeItem(cartKey);

        setCart([]);

        alert("Order cancelled successfully.");
    };



    // ==========================================
    // LOCATION
    // ==========================================

    const getLocation = (property) => {

        if (property.city) {
            return property.city;
        }

        if (property.location) {
            return property.location;
        }

        if (property.name?.includes(" in ")) {

            return property.name
                .split(" in ")
                .pop();

        }

        return "Location";
    };


    // ==========================================
    // TOTAL
    // ==========================================

    const getPrice = (price) => {

        if (!price) {
            return 0;
        }

        return Number(
            String(price)
                .replace(/[^0-9]/g, "")
        ) || 0;
    };


    const totalPrice =
        cart.reduce(
            (total, property) =>
                total +
                getPrice(property.price),
            0
        );


    return (

        <div className="cart-page">

            {/* =====================================
                HEADER
            ===================================== */}

            <div className="cart-header">

                <div>

                    <span className="cart-label">
                        <FaCartShopping />
                        NESTFINDER • YOUR CART
                    </span>

                    <h1>
                        Your
                        <span> Property Cart</span>
                    </h1>

                    <p>
                        Review your selected properties
                        before making your purchase.
                    </p>

                </div>
                <div className="cart-person-image">
                    <img
                        src="https://i.imgur.com/F0QQrd7.jpeg"
                        alt="Real estate advisor"
                    />
                </div>
                <div className="cart-journey">
                    <div className="cart-count">
                        <FaCartShopping />

                        <strong>
                            {cart.length}
                        </strong>

                        <span>
                            {cart.length === 1
                                ? "Property"
                                : "Properties"}
                        </span>
                    </div>
                    <div className="journey-heading">
                        <span>YOUR PROPERTY JOURNEY</span>
                        <strong>From search to<br />your new home.</strong>
                    </div>

                    <div className="journey-steps">

                        <div className="journey-step active">
                            <div className="journey-icon">
                                <FaMagnifyingGlass />
                            </div>

                            <div>
                                <strong>Explore</strong>
                                <span>Discover properties</span>
                            </div>
                        </div>

                        <div className="journey-arrow">→</div>

                        <div className="journey-step">
                            <div className="journey-icon">
                                <FaHeart />
                            </div>

                            <div>
                                <strong>Shortlist</strong>
                                <span>Save your favourites</span>
                            </div>
                        </div>

                        <div className="journey-arrow">→</div>

                        <div className="journey-step">
                            <div className="journey-icon">
                                <FaCartShopping />
                            </div>

                            <div>
                                <strong>Choose</strong>
                                <span>Review your selection</span>
                            </div>
                        </div>

                        <div className="journey-arrow">→</div>

                        <div className="journey-step">
                            <div className="journey-icon">
                                <FaHouse />
                            </div>

                            <div>
                                <strong>Move In</strong>
                                <span>Find your next home</span>
                            </div>
                        </div>

                    </div>

                </div>



            </div>


            {/* =====================================
                EMPTY CART
            ===================================== */}

            {cart.length === 0 ? (

                <div className="empty-cart">

                    <div className="empty-cart-icon">
                        <FaCartShopping />
                    </div>

                    <h2>
                        Your cart is empty
                    </h2>

                    <p>
                        You haven't added any property
                        to your cart yet.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/property")
                        }
                    >
                        <FaHouse />
                        Explore Properties
                    </button>

                </div>

            ) : (

                <div className="cart-layout">

                    {/* =================================
                        LEFT — CART ITEMS
                    ================================= */}

                    <div className="cart-items">

                        {cart.map((property) => (

                            <div
                                className="cart-property"
                                key={property.id}
                            >

                                {/* IMAGE */}

                                <div className="cart-property-image">


                                    <img src={property.images?.[0]} alt={property.name} />



                                </div>


                                {/* DETAILS */}

                                <div className="cart-property-details">

                                    <span className="cart-property-type">
                                        {property.category ||
                                            property.type ||
                                            "PROPERTY"}
                                    </span>

                                    <h2>
                                        {property.name ||
                                            property.title}
                                    </h2>

                                    <div className="cart-location">

                                        <FaLocationDot />

                                        <span>
                                            {getLocation(property)}
                                        </span>

                                    </div>

                                    {property.description && (

                                        <p>
                                            {property.description}
                                        </p>

                                    )}

                                    <div className="cart-price">

                                        <span>
                                            Price :
                                        </span>
                                        ₹
                                        <strong>

                                            {getPrice(
                                                property.price
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>


                                    {/* BUTTONS */}

                                    <div className="cart-actions">

                                        <button
                                            className="buy-now-btn"
                                            onClick={() =>
                                                buyNow(property)
                                            }
                                        >
                                            <FaCreditCard />
                                            Buy Now
                                        </button>

                                        <button
                                            className="remove-cart-btn"
                                            onClick={() =>
                                                removeFromCart(
                                                    property.id
                                                )
                                            }
                                        >
                                            <FaTrash />
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* =================================
                        RIGHT — ORDER SUMMARY
                    ================================= */}

                    <div className="cart-summary">

                        <span className="summary-label">
                            ORDER SUMMARY
                        </span>

                        <h2>
                            Your Selection
                        </h2>

                        <div className="summary-row">

                            <span>
                                Properties
                            </span>

                            <strong>
                                {cart.length}
                            </strong>

                        </div>

                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>

                                ₹ {totalPrice.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹ {totalPrice.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        <button
                            className="summary-buy-btn"
                            onClick={() =>
                                buyNow(cart[0])
                            }
                        >
                            <FaCreditCard />
                            Buy Now
                        </button>


                        <button
                            className="cancel-order-btn"
                            onClick={cancelOrder}
                        >
                            <FaXmark />
                            Cancel Order
                        </button>


                        <button
                            className="continue-shopping-btn"
                            onClick={() =>
                                navigate("/property")
                            }
                        >
                            <FaArrowLeft />
                            Continue Shopping
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Cart;
