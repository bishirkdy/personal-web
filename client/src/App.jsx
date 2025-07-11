// App.jsx
import React, { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();
  const { contactRef , aboutRef } = useOutletContext();

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
      <Home contactRef={contactRef} aboutRef={aboutRef} />
    </>
  );
};

export default App;
