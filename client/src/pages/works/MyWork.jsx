import React from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";

import NavBar from "../../components/NavBar";
import Projects from "./Projects";
import Footer from "../../components/Footer";

const MyWork = () => {
  return (
    <div>
      <div className="bg-[var(--color-primary)]">
        <NavBar />
        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
          <div className="flex flex-row w-1/6 items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <IoFilterSharp className="text-[var(--color-secondary)] text-lg" />
            <span className="text-gray-400 font-medium">Filter</span>
          </div>

          <div className="flex flex-row w-4/6 items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <IoMdSearch className="text-[var(--color-secondary)] text-xl" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>
        </div>
      </div>
      <div>
        <Projects/>
      </div>
      <Footer/>
    </div>
  );
};

export default MyWork;
