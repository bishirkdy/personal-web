// Home.jsx
import React from "react";
import Service from "../components/Service";
import Work from "../components/Work";
import About from "../components/About";
import Contact from "../components/Contact";
import AiProject from "./works/ai/AiProject";

const Home = ({ contactRef }) => {
  return (
    <div>
      <Service />
      <Work />
      <AiProject/>
      <About />
      <section ref={contactRef}>
        <Contact />
      </section>
    </div>
  );
};

export default Home;
