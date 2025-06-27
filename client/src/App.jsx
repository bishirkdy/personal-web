// App.jsx
import React, { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();
  const { contactRef } = useOutletContext(); // 👈 use context from Outlet

  useEffect(() => {
    if (location.state?.scrollToContact) {
      setTimeout(() => {
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location, contactRef]);

  return (
    <>
      <Header />
      <Home contactRef={contactRef} />
    </>
  );
};

export default App;
