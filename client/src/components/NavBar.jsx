import React, { useState, useEffect } from "react";
import linkedIn from "../assets/linkedin.png";
import instagram from "../assets/instagram.png";
import github from "../assets/github.png";
import { FaTimes, FaBars } from 'react-icons/fa';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuOpen && !e.target.closest("#mobileMenu") && !e.target.closest("#hamburgerBtn")) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "" , src: instagram, alt: "Instagram" },
    { href: "", src: linkedIn, alt: "LinkedIn" },
    { href: "", src: github, alt: "GitHub" },
  ];

  const NavLinks = ({ isMobile, onClick }) => (
    <ul className={`flex ${isMobile ? "flex-col pt-6" : "flex-row justify-around items-center gap-3 md:gap-8"}`}>
      {navItems.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className={`block text-sm md:text-md text-black rounded-xl hover:bg-[var(--color-secondary)] p-2 hover:text-[var(--color-primary)] transition-colors duration-200 ${isMobile ? "text-lg" : ""}`}
            onClick={isMobile ? onClick : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  const SocialLinks = ({ isMobile, onClick }) => (
    <ul className={`flex ${isMobile ? "flex-row gap-5 pt-6 border-t border-gray-600" : "flex-row justify-around items-center gap-2 md:gap-4"}`}>
      {socialLinks.map((social, index) => (
        <li key={index}>
          <a
            href={social.href}
            aria-label={social.alt}
            onClick={isMobile ? onClick : undefined}
          >
            <img
              src={social.src}
              className={`w-5 h-5 md:w-6 md:h-6 hover:scale-110 transition-transform ${isMobile ? "w-6 h-6" : ""}`}
              alt={social.alt}
            />
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="flex flex-row justify-between items-center bg-[var(--color-primary)] py-4 px-4 md:px-8 lg:px-32 relative z-50">
      <div className="pl-0">
        <a className="navName text-xl md:text-2xl font-bold text-black tracking-tight" href="/">
          Bishir kdy
        </a>
      </div>

      <div className="hidden sm:block">
        <NavLinks isMobile={false} />
      </div>

      <div className="pr-0 hidden sm:block">
        <SocialLinks isMobile={false} />
      </div>

      <div className="block sm:hidden">
        {!menuOpen && (
          <button
            id="hamburgerBtn"
            className="text-2xl text-black focus:outline-none hover:text-[var(--color-accent)] transition-colors"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>
        )}
      </div>

      {menuOpen && (
        <div
          id="mobileMenu"
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-end z-50"
        >
          <div className="w-[70vw] h-full bg-[var(--color-primary)] shadow-lg flex flex-col justify-between pt-4 pb-4 px-6 gap-8 animate-slide-in-right relative">
            <button
              className="absolute top-3 right-3 text-2xl text-black focus:outline-none hover:text-[var(--color-secondary)] transition-colors"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>
            <div className="mt-10 pb-2 flex h-full flex-col justify-between">
              <NavLinks isMobile={true} onClick={() => setMenuOpen(false)} />
              <SocialLinks isMobile={true} onClick={() => setMenuOpen(false)} />
            </div>
          </div>

          <style jsx>{`
            .animate-slide-in-right {
              animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @keyframes slideInRight {
              0% {
                transform: translateX(100%);
                opacity: 0;
              }
              100% {
                transform: translateX(0%);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </nav>
  );
};

export default NavBar;