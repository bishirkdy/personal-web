// Home.jsx
import React from "react";
import Service from "../components/Service";
import Header from "../components/Header";
import Work from "../components/Work";
import About from "../components/About";
import Contact from "../components/Contact";
import AiProject from "./works/ai/AiProject";

const Home = ({ contactRef  , aboutRef}) => {
  return (
    <div>
      <Header />
      <Service />
      <Work />
      <AiProject />
      <section ref={aboutRef}>
      <About />
      </section>
      <section ref={contactRef}>
        <Contact />
      </section>
    </div>
  );
};

export default Home;
