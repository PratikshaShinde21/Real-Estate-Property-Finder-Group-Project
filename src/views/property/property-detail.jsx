import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaChevronLeft,
    FaChevronRight,
    FaHeart,
    FaRegHeart,
    FaStar,
    FaRegStar,
    FaMinus,
    FaPlus,
    FaHouse,
    FaMagnifyingGlass,
    FaCartShopping,
    FaComments,
    FaShieldHalved,
    FaLightbulb,
    FaHouseChimney
} from "react-icons/fa6";

import properties from "./../../data/property-data";

import "./property-detail.css";

function PropertyDetail() {

    const navigate = useNavigate();

    const propertyId =
        localStorage.getItem(
            "selectedProperty"
        );

    const property =
        properties.find(
            item =>
                item.id == propertyId
        );

    const [currentImageIndex, setCurrentImageIndex] =
        useState(0);

    const [quantity, setQuantity] =
        useState(1);

    const [wishlist, setWishlist] =
        useState(false);

    const [selectedRating, setSelectedRating] =
        useState(0);

    const [reviewText, setReviewText] =
        useState("");

    const [reviews, setReviews] =
        useState([]);


    // =====================================================
    // CHECK WISHLIST
    // =====================================================

    useEffect(() => {

        if (!property) {
            return;
        }

        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "currentUser"
                )
            );

        if (!currentUser) {
            setWishlist(false);
            return;
        }

        const wishlistKey =
            "wishlist_" +
            currentUser.mobile;

        const savedWishlist =
            JSON.parse(
                localStorage.getItem(
                    wishlistKey
                )
            ) || [];

        const exists =
            savedWishlist.some(
                item =>
                    item.id === property.id
            );

        setWishlist(
            exists
        );

    }, [property]);


    // =====================================================
    // LOAD REVIEWS
    // =====================================================

    useEffect(() => {

        if (!property) {
            return;
        }

        const reviewKey =
            "reviews_" +
            property.id;

        const savedReviews =
            JSON.parse(
                localStorage.getItem(
                    reviewKey
                )
            ) || [];

        setReviews(
            savedReviews
        );

    }, [property]);


    // =====================================================
    // AUTO IMAGE SLIDER
    // =====================================================

    useEffect(() => {

        if (
            !property ||
            !property.images ||
            property.images.length <= 1
        ) {
            return;
        }

        const interval =
            setInterval(() => {

                setCurrentImageIndex(
                    previousIndex => {

                        if (
                            previousIndex + 1 >=
                            property.images.length
                        ) {
                            return 0;
                        }

                        return previousIndex + 1;

                    }
                );

            }, 4000);

        return () => {

            clearInterval(
                interval
            );

        };

    }, [property]);


    // =====================================================
    // PROPERTY NOT FOUND
    // =====================================================

    if (!property) {

        return (

            <div className="property-detail-loading">

                <h2>
                    Property Not Found
                </h2>

                <button
                    onClick={() =>
                        navigate(
                            "/property"
                        )
                    }
                >
                    Back To Properties
                </button>

            </div>

        );

    }


    // =====================================================
    // DISCOUNT
    // =====================================================

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


    // =====================================================
    // CHANGE IMAGE
    // =====================================================

    const changeImage = (
        index
    ) => {

        setCurrentImageIndex(
            index
        );

    };


    // =====================================================
    // PREVIOUS IMAGE
    // =====================================================

    const previousImage = () => {

        setCurrentImageIndex(
            previousIndex => {

                if (
                    previousIndex === 0
                ) {

                    return (
                        property.images.length -
                        1
                    );

                }

                return previousIndex - 1;

            }
        );

    };


    // =====================================================
    // NEXT IMAGE
    // =====================================================

    const nextImage = () => {

        setCurrentImageIndex(
            previousIndex => {

                if (
                    previousIndex + 1 >=
                    property.images.length
                ) {

                    return 0;

                }

                return previousIndex + 1;

            }
        );

    };


    // =====================================================
    // INCREASE QUANTITY
    // MAXIMUM = 2
    // =====================================================

    const increaseQuantity = () => {

        setQuantity(
            previousQuantity => {

                if (
                    previousQuantity >= 2
                ) {

                    alert(
                        "Maximum quantity is 2."
                    );

                    return 2;

                }

                return previousQuantity + 1;

            }
        );

    };


    // =====================================================
    // DECREASE QUANTITY
    // MINIMUM = 1
    // =====================================================

    const decreaseQuantity = () => {

        setQuantity(
            previousQuantity => {

                if (
                    previousQuantity <= 1
                ) {

                    alert(
                        "Minimum quantity is 1."
                    );

                    return 1;

                }

                return previousQuantity - 1;

            }
        );

    };


    // =====================================================
    // TOGGLE WISHLIST
    // =====================================================

    const toggleWishlist = () => {

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

        let savedWishlist =
            JSON.parse(
                localStorage.getItem(
                    wishlistKey
                )
            ) || [];

        const exists =
            savedWishlist.some(
                item =>
                    item.id === property.id
            );


        if (exists) {

            savedWishlist =
                savedWishlist.filter(
                    item =>
                        item.id !== property.id
                );

            setWishlist(
                false
            );

            alert(
                "Removed From Wishlist"
            );

        }

        else {

            savedWishlist.push(
                property
            );

            setWishlist(
                true
            );

            alert(
                "Added To Wishlist"
            );

        }


        localStorage.setItem(
            wishlistKey,
            JSON.stringify(
                savedWishlist
            )
        );

    };


    // =====================================================
    // BUY NOW
    // =====================================================

    const buyNow = () => {

        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "currentUser"
                )
            );


        // USER NOT LOGGED IN
        if (!currentUser) {

            alert(
                "Please Login First"
            );

            navigate(
                "/login"
            );

            return;

        }


        // SAME KEY USED BY CART PAGE
        const cartKey =
            "cart_" +
            currentUser.mobile;


        // GET EXISTING CART
        let cart =
            JSON.parse(
                localStorage.getItem(
                    cartKey
                )
            ) || [];


        // CHECK WHETHER PROPERTY
        // IS ALREADY IN CART
        const alreadyInCart =
            cart.some(
                item =>
                    item.id === property.id
            );


        if (alreadyInCart) {

            alert(
                "Property Already In Cart"
            );

            navigate(
                "/cart"
            );

            return;

        }


        // CREATE CART ITEM
        const cartItem = {

            ...property,

            quantity:
                quantity

        };


        // ADD PROPERTY
        cart.push(
            cartItem
        );


        // SAVE CART
        localStorage.setItem(
            cartKey,
            JSON.stringify(
                cart
            )
        );


        // USER MESSAGE
        alert(
            "Property Added To Cart Successfully 🎉"
        );


        // GO TO CART
        navigate(
            "/cart"
        );

    };


    // =====================================================
    // RATE PROPERTY
    // =====================================================

    const rateProperty = (
        rating
    ) => {

        setSelectedRating(
            rating
        );

    };


    // =====================================================
    // SUBMIT REVIEW
    // =====================================================

    const submitReview = () => {

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


        if (
            selectedRating === 0
        ) {

            alert(
                "Please select a rating"
            );

            return;

        }


        if (
            reviewText.trim() === ""
        ) {

            alert(
                "Write a review first"
            );

            return;

        }


        const review = {

            name:
                currentUser.name,

            rating:
                selectedRating,

            text:
                reviewText.trim(),

            date:
                new Date()
                    .toLocaleDateString()

        };


        const reviewKey =
            "reviews_" +
            property.id;


        const updatedReviews = [

            ...reviews,

            review

        ];


        localStorage.setItem(

            reviewKey,

            JSON.stringify(
                updatedReviews
            )

        );


        setReviews(
            updatedReviews
        );


        setReviewText(
            ""
        );


        setSelectedRating(
            0
        );


        alert(
            "Review Submitted Successfully"
        );

    };


    // =====================================================
    // GO BACK
    // =====================================================

    const goBack = () => {

        navigate(
            "/property"
        );

    };


    // =====================================================
    // JSX
    // =====================================================

    return (

        <div className="property-detail-page">


            {/* =================================================
                BACK BUTTON
            ================================================= */}

            <button
                className="back-button"
                onClick={
                    goBack
                }
            >

                <FaChevronLeft />

                <span>
                    Back To Properties
                </span>

            </button>


            <div className="property-detail-container">


                {/* =================================================
                    GALLERY
                ================================================= */}

                <div className="property-detail-gallery">


                    {/* MAIN IMAGE */}

                    <div className="property-detail-main-image">

                        <img
                            src={
                                property.images?.[
                                currentImageIndex
                                ]
                            }
                            alt={
                                property.name
                            }
                        />


                        {/* WISHLIST */}

                        <button
                            className={
                                wishlist
                                    ? "detail-wishlist wishlisted"
                                    : "detail-wishlist"
                            }
                            onClick={
                                toggleWishlist
                            }
                            aria-label={
                                wishlist
                                    ? "Remove from wishlist"
                                    : "Add to wishlist"
                            }
                        >

                            {wishlist ? (

                                <FaHeart />

                            ) : (

                                <FaRegHeart />

                            )}

                        </button>


                        {/* PREVIOUS */}

                        {property.images?.length > 1 && (

                            <button
                                className="image-arrow image-arrow-left"
                                onClick={
                                    previousImage
                                }
                            >

                                <FaChevronLeft />

                            </button>

                        )}


                        {/* NEXT */}

                        {property.images?.length > 1 && (

                            <button
                                className="image-arrow image-arrow-right"
                                onClick={
                                    nextImage
                                }
                            >

                                <FaChevronRight />

                            </button>

                        )}

                    </div>


                    {/* THUMBNAILS */}

                    <div className="property-detail-thumbnails">

                        {property.images?.map(

                            (
                                image,
                                index
                            ) => (

                                <button
                                    key={
                                        index
                                    }
                                    className={
                                        currentImageIndex === index
                                            ? "property-thumbnail active"
                                            : "property-thumbnail"
                                    }
                                    onClick={() =>
                                        changeImage(
                                            index
                                        )
                                    }
                                >

                                    <img
                                        src={
                                            image
                                        }
                                        alt={
                                            `${property.name} ${index + 1}`
                                        }
                                    />

                                </button>

                            )

                        )}

                    </div>

                </div>


                {/* =================================================
                    PROPERTY CONTENT
                ================================================= */}

                <div className="property-detail-content">


                    <span className="property-detail-category">

                        {
                            property.category
                        }

                    </span>


                    <h1>

                        {
                            property.name
                        }

                    </h1>


                    <p className="property-detail-description">

                        {
                            property.description
                        }

                    </p>


                    {/* PRICE */}

                    <div className="property-detail-price">

                        Price:

                        {property.originalPrice && (

                            <del>

                                ₹{" "}

                                {
                                    property.originalPrice
                                        .toLocaleString()
                                }

                            </del>

                        )}


                        <strong>

                            ₹{" "}

                            {
                                property.price
                                    .toLocaleString()
                            }

                        </strong>


                        {discount > 0 && (

                            <span>

                                {
                                    discount
                                }

                                % OFF

                            </span>

                        )}

                    </div>


                    {/* HIGHLIGHTS */}

                    {property.highlights &&
                        property.highlights.length > 0 && (

                            <div className="property-detail-highlights">

                                <h3>
                                    Property Highlights
                                </h3>

                                <ul>

                                    {property.highlights.map(

                                        (
                                            highlight,
                                            index
                                        ) => (

                                            <li
                                                key={
                                                    index
                                                }
                                            >

                                                {
                                                    highlight
                                                }

                                            </li>

                                        )

                                    )}

                                </ul>

                            </div>

                        )}


                    {/* =================================================
                        QUANTITY
                    ================================================= */}

                    <div className="quantity-section">

                        <h3>
                            Quantity
                        </h3>


                        <div className="quantity-control">


                            <button
                                onClick={
                                    decreaseQuantity
                                }
                                aria-label="Decrease quantity"
                            >

                                <FaMinus />

                            </button>


                            <span>

                                {
                                    quantity
                                }

                            </span>


                            <button
                                onClick={
                                    increaseQuantity
                                }
                                aria-label="Increase quantity"
                            >

                                <FaPlus />

                            </button>


                        </div>

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="property-detail-actions">


                        {/* WISHLIST BUTTON */}

                        <button
                            className={
                                wishlist
                                    ? "detail-wishlist-button active"
                                    : "detail-wishlist-button"
                            }
                            onClick={
                                toggleWishlist
                            }
                        >

                            {wishlist ? (

                                <FaHeart />

                            ) : (

                                <FaRegHeart />

                            )}


                            <span>

                                {
                                    wishlist
                                        ? "Wishlisted"
                                        : "Add To Wishlist"
                                }

                            </span>

                        </button>


                        {/* BUY NOW */}

                        <button
                            className="buy-now-button"
                            onClick={
                                buyNow
                            }
                        >

                            <span>
                                Buy Now
                            </span>

                        </button>


                    </div>

                </div>

            </div>


            {/* =================================================
                BOTTOM SECTIONS
            ================================================= */}

            <div className="property-bottom-sections">


                {/* =================================================
                    WHY SHOP WITH US
                ================================================= */}

                <section className="why-shop-section">


                    <div className="why-shop-heading">

                        <span>
                            WHY SHOP WITH US ?
                        </span>


                        <h2>

                            A better way to

                            <strong>
                                {" "}find your home.
                            </strong>

                        </h2>


                        <p>

                            Everything you need to discover,
                            shortlist, and choose your perfect property.

                        </p>

                    </div>


                    <div className="why-shop-cards">


                        {/* CARD 1 */}

                        <div className="why-shop-card">

                            <div className="why-shop-icon">

                                <FaHouse />

                            </div>


                            <div>

                                <h3>
                                    Verified Properties
                                </h3>

                                <p>

                                    Explore carefully selected properties
                                    with reliable listing information.

                                </p>

                            </div>

                        </div>


                        {/* CARD 2 */}

                        <div className="why-shop-card">

                            <div className="why-shop-icon">

                                <FaMagnifyingGlass />

                            </div>


                            <div>

                                <h3>
                                    Easy Property Search
                                </h3>

                                <p>

                                    Find the right property quickly with
                                    simple search and filtering.

                                </p>

                            </div>

                        </div>


                        {/* CARD 3 */}

                        <div className="why-shop-card">

                            <div className="why-shop-icon">

                                <FaHeart />

                            </div>


                            <div>

                                <h3>
                                    Save Your Favorites
                                </h3>

                                <p>

                                    Keep your favorite properties together
                                    and revisit them whenever you want.

                                </p>

                            </div>

                        </div>


                        {/* CARD 4 */}

                        <div className="why-shop-card">

                            <div className="why-shop-icon">

                                <FaCartShopping />

                            </div>


                            <div>

                                <h3>
                                    Simple Buying
                                </h3>

                                <p>

                                    Review your selected properties and
                                    make your purchase with ease.

                                </p>

                            </div>

                        </div>


                    </div>

                </section>


                {/* =================================================
                    CUSTOMER REVIEWS
                ================================================= */}
                <section className="property-reviews">

                    {/* =====================================================
        SECTION TITLE
    ===================================================== */}

                    <h2>
                        Customer Reviews
                    </h2>


                    {/* =====================================================
        MAIN LEFT + RIGHT LAYOUT
    ===================================================== */}

                    <div className="review-main-layout">


                        {/* =================================================
            LEFT SIDE — REVIEW
        ================================================= */}

                        <div className="review-left">


                            {/* ================= RATING ================= */}

                            <div className="rating-section">

                                <h3>
                                    Rate This Property
                                </h3>


                                <div className="rating-stars">

                                    {[1, 2, 3, 4, 5].map(

                                        (rating) => (

                                            <button
                                                key={rating}
                                                type="button"
                                                className={
                                                    rating <= selectedRating
                                                        ? "rating-star-button selected"
                                                        : "rating-star-button"
                                                }
                                                onClick={() =>
                                                    rateProperty(rating)
                                                }
                                            >

                                                {rating <= selectedRating ? (

                                                    <FaStar />

                                                ) : (

                                                    <FaRegStar />

                                                )}

                                            </button>

                                        )

                                    )}

                                </div>


                                {selectedRating > 0 && (

                                    <p>

                                        You rated this property{" "}

                                        <strong>
                                            {selectedRating}
                                        </strong>

                                        {" "}out of 5

                                    </p>

                                )}

                            </div>


                            {/* ================= REVIEW FORM ================= */}

                            <div className="review-form">

                                <textarea
                                    value={reviewText}
                                    onChange={(e) =>
                                        setReviewText(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Write your review..."
                                />


                                <button
                                    onClick={submitReview}
                                >

                                    Submit Review

                                </button>

                            </div>


                            {/* ================= EXISTING REVIEWS ================= */}

                            <div className="reviews-container">

                                {reviews.length === 0 ? (

                                    <p className="no-reviews">

                                        No reviews yet.
                                        Be the first to review this property.

                                    </p>

                                ) : (

                                    reviews.map(

                                        (review, index) => (

                                            <div
                                                className="review-card"
                                                key={index}
                                            >


                                                <div className="review-card-header">


                                                    <div>

                                                        <h4>

                                                            {review.name}

                                                        </h4>


                                                        <div className="review-stars">

                                                            {[1, 2, 3, 4, 5].map(

                                                                star => (

                                                                    star <= review.rating ? (

                                                                        <FaStar
                                                                            key={star}
                                                                        />

                                                                    ) : (

                                                                        <FaRegStar
                                                                            key={star}
                                                                        />

                                                                    )

                                                                )

                                                            )}

                                                        </div>

                                                    </div>


                                                    <small>

                                                        {review.date}

                                                    </small>

                                                </div>


                                                <p>

                                                    {review.text}

                                                </p>


                                            </div>

                                        )

                                    )

                                )}

                            </div>

                        </div>


                        {/* =================================================
            RIGHT SIDE — IMAGE + CONFIDENCE
        ================================================= */}

                        <div className="review-right">


                            {/* ================= PROPERTY IMAGE ================= */}

                            <div className="review-property-image">

                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVN8qu2UTAb8D3Zb84I17b8en83iOrS-eRdUdJ1w6eI5R1Ykb2spLOKjst&s=10"
                                    alt="Property"
                                />

                            </div>


                            {/* ================= TITLE ================= */}

                            <div className="review-confidence">


                                <h3>
                                    Choose With Confidence
                                </h3>


                                {/* ================= 4 POINTS ================= */}

                                <div className="review-benefits-grid">


                                    {/* POINT 1 */}

                                    <div className="review-benefit">

                                        <FaComments />

                                        <span>
                                            Real Stories
                                        </span>

                                    </div>


                                    {/* POINT 2 */}

                                    <div className="review-benefit">

                                        <FaShieldHalved />

                                        <span>
                                            Honest Opinions
                                        </span>

                                    </div>


                                    {/* POINT 3 */}

                                    <div className="review-benefit">

                                        <FaLightbulb />

                                        <span>
                                            Clear Insights
                                        </span>

                                    </div>


                                    {/* POINT 4 */}

                                    <div className="review-benefit">

                                        <FaHouseChimney />

                                        <span>
                                            Better Choices
                                        </span>

                                    </div>


                                </div>

                            </div>

                        </div>


                    </div>

                </section>


            </div>


        </div>

    );

}


export default PropertyDetail;