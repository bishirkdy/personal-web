import React, { useState, useEffect } from "react";
import { FaTimes, FaBars, FaCartArrowDown } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NavBar = ({ onCartClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (
        menuOpen &&
        !e.target.closest("#mobileMenu") &&
        !e.target.closest("#hamburgerBtn")
      ) {
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

  const NavLinks = ({ isMobile, onClick }) => (
    <ul
      className={`flex ${
        isMobile
          ? "flex-col pt-6"
          : "flex-row justify-around items-center gap-3 md:gap-8"
      }`}
    >
      {navItems.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className={`block text-sm md:text-md text-black rounded-xl hover:bg-[var(--color-secondary)] p-2 hover:text-[var(--color-primary)] transition-colors duration-200 ${
              isMobile ? "text-lg" : ""
            }`}
            onClick={isMobile ? onClick : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  const handleLogin = () => navigate("/login");

  return (
    <nav className="flex flex-row justify-between items-center bg-[var(--color-primary)] py-4 px-4 md:px-8 lg:px-32 relative z-50">
      <div className="pl-0">
        <a
          className="navName text-xl md:text-2xl font-bold text-black tracking-tight"
          href="/"
        >
          Bishir kdy
        </a>
      </div>

      <div className="hidden sm:block">
        <NavLinks isMobile={false} />
      </div>

      <div className="pr-0 hidden sm:flex gap-2 items-center">
        <button
          onClick={onCartClick}
          className="flex items-center gap-2 bg-[var(--color-secondary)] text-[var(--color-primary)] px-4 py-2 rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
        >
          <FaCartArrowDown />
          Cart
        </button>
        <button
          onClick={handleLogin}
          className="flex items-center gap-2 bg-[var(--color-secondary)] text-[var(--color-primary)] px-4 py-2 rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
        >
          <IoLogIn />
          Login
        </button>
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
              <div className="flex flex-col gap-3 mt-8">
                <button
                  onClick={() => {
                    onCartClick();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-secondary)] text-[var(--color-primary)] px-4 py-2 rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  <FaCartArrowDown />
                  Cart
                </button>
                <button
                  onClick={() => {
                    handleLogin();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-secondary)] text-[var(--color-primary)] px-4 py-2 rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  <IoLogIn />
                  Login
                </button>
              </div>
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