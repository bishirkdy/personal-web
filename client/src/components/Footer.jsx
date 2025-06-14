import React from "react";
import profile from "../assets/profile.jpg";
import { FaLinkedin, FaGithub, FaInstagram, FaBehance } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { TbClipboardCopy } from "react-icons/tb";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-[var(--color-secondary)] pt-16 pb-4 flex flex-col items-center justify-center w-full">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full max-w-6xl gap-8 md:gap-0 px-4 md:px-8">
        {/* Left - About & Social */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h2 className="text-white text-center md:text-left w-full max-w-[340px] py-4 text-sm md:text-base">
            Currently taking on freelance opportunities in web development,
            UI/UX design, branding, and multimedia. If you're looking for a
            reliable creative partner to build digital solutions, I’d love to
            connect.
          </h2>
          <hr className="border-white w-full opacity-30 mb-1" />
          <ul className="flex flex-row items-center justify-center md:justify-start gap-4 pt-2 text-white text-2xl w-full">
            <li><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
            <li><a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
            <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
            <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter /></a></li>
            <li><a href="https://behance.net/" target="_blank" rel="noopener noreferrer"><FaBehance /></a></li>
          </ul>
        </div>

        {/* Center - Image */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 mb-8 md:mb-0">
          <div className="relative w-32 h-40 md:w-44 md:h-56 hover:scale-105 duration-300 transition-transform ease-in-out">
            <div className="absolute left-0 top-4 w-32 h-40 md:w-44 md:h-56 bg-gray-600 rounded-[80%_80%_80%_80%/80%_80%_80%_80%] rotate-[-30deg] translate-x-[-10px] shadow-md"></div>
            <div className="absolute left-4 top-0 w-32 h-40 md:w-44 md:h-56 bg-white rounded-[80%_80%_80%_80%/80%_80%_80%_80%] rotate-[20deg] shadow-md border border-white">
              <img
                src={profile}
                className="object-cover w-full h-full rounded-[80%_80%_80%_80%/80%_80%_80%_80%]"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Right - Name & Actions */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end">
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center md:text-right">Bishir Mhd</h1>
          <h6 className="text-white text-[10px] pb-2 md:pb-4 text-center md:text-right">
            Web Developer | Graphic Designer | UI/UX Specialist
          </h6>
          <hr className="border-white w-full opacity-30 mb-2" />
          <div className="flex flex-col xs:flex-row items-center justify-center md:justify-end gap-3 w-full pt-4">
            <button className="flex items-center font-bold cursor-pointer gap-2 hover:text-white bg-white px-3 py-2 rounded-md hover:bg-[var(--color-primary-hover)] transition-colors text-[var(--color-secondary)] w-full xs:w-auto justify-center">
              <MdOutlineBrowserUpdated />
              <span>Let's Connect</span>
            </button>
            <button className="flex items-center font-bold cursor-pointer gap-2 hover:text-white bg-white px-3 py-2 rounded-md hover:bg-[var(--color-primary-hover)] transition-colors text-[var(--color-secondary)] w-full xs:w-auto justify-center">
              <TbClipboardCopy />
              <span>Copy Email</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full pt-8 justify-center">
        <span className="text-xs sm:text-sm text-white opacity-60 tracking-wide text-center">
          © {currentYear} Bishir Kdy. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;