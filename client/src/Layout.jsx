import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Cart from "./pages/cart/Cart";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector(state => state.cart)
  
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <ScrollToTop/>
      <NavBar onCartClick={() => setCartOpen(true)} onContactClick={scrollToContact} />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
      />
      <main>
        <Outlet context={{ contactRef }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
