import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Cart from "./pages/cart/Cart";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import { useError, useScroll } from "./components/ContestProvider";
import ErrorPage from "./components/error/ErrorComponent";

const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);

  const { contactRef, aboutRef } = useScroll();
  const {error } = useError();
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (error) {
    return (
      <ErrorPage
        code={error.code || 500}
        message={error.status || "Something went wrong"}
        status={error.message || "Server error. Please try again later."}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div>
      <ScrollToTop />
      <NavBar
        onCartClick={() => setCartOpen(true)}
        onContactClick={scrollToContact}
        onAboutClick={scrollToAbout}
      />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
      />
      <main>
        <Outlet context={{ contactRef , aboutRef }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
