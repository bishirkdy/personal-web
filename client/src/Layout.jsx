import React from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useState } from "react";
import Cart from "./pages/cart/Cart";

const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = [];

  return (
    <div>
      <NavBar onCartClick={() => setCartOpen(true)} />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
