import React from "react";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PlaceOrder from "./pages/PlaceOrder";
import Collections from "./pages/Collections";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="w-full px-10 sm:px-[6vw] ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/products/:productId" element={<Product />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
