import React from "react";
import Service from "../components/Service";
import Work from "../components/Work";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Service />
      <Work />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
