import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./views/About/About";
import Wishlist from "./views/Wishlist/Wishlist";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import NotFound from "./views/notfound/Notfound";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Property from "./views/property/property";
import PropertyDetail from "./views/property/property-detail";
import Cart from "./views/cart/cart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
           <Route path="/property" element={<Property />} />
         <Route
                path="/property-detail"
                element={<PropertyDetail />}
            />

<Route
    path="/cart"
    element={<Cart />}
/>


        <Route path="/login" element={<Login />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;