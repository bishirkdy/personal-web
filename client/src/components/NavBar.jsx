import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaCartArrowDown } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { CgMenuRight } from "react-icons/cg";

import { IoMdLogOut } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = ({ onCartClick, onContactClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const closeTimer = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        setIsActive(window.scrollY > navRef.current.offsetHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        !e.target.closest("#mobileMenu") &&
        !e.target.closest("#hamburgerBtn")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleContactClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToContact: true } });
    } else {
      onContactClick();
    }
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleMouseEnter = (menu) => {
    clearTimeout(closeTimer.current);
    setOpenSub(menu);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenSub(null), 200);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { label: "Work" },
    { isContact: true, label: "Contact" },
  ];

  const adminItems = [
    { href: "/admin/users", label: "Manage Users" },
    { href: "/admin/create-project", label: "Add Project" },
    { href: "/admin/add-ai", label: "Add AI Prompts" },
  ];

  const subWorksItems = [
    { href: "/projects", label: "My Works" },
    { href: "/ai-prompts", label: "AI Prompts" },
  ];

  const SubMenu = ({ items, isMobile }) => (
    <ul
      className={`mt-2 ${
        isMobile
          ? "flex flex-col gap-1"
          : "absolute bg-[var(--color-primary)] rounded-lg shadow-lg mt-2 w-35 border border-gray-200 z-50"
      }`}
    >
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            onClick={isMobile ? () => setMenuOpen(false) : undefined}
            className="block px-3 py-2 rounded-lg text-black hover:bg-black hover:text-white transition"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  const NavLinks = ({ isMobile }) => (
    <ul
      className={`flex ${
        isMobile ? "flex-col mt-4" : "flex-row gap-4 items-center"
      }`}
    >
      {navItems.map((item) => (
        <li
          key={item.label}
          className="relative"
          onMouseEnter={
            !isMobile && item.label === "Work"
              ? () => handleMouseEnter("work")
              : undefined
          }
          onMouseLeave={
            !isMobile && item.label === "Work" ? handleMouseLeave : undefined
          }
        >
          {item.label === "Work" ? (
            <>
              <button
                onClick={() =>
                  setOpenSub(openSub === "work" ? null : "work")
                }
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-black bg-[var(--color-primary)] hover:bg-black hover:text-white transition"
              >
                {item.label}
                <span
                  className={`ml-2 transform transition-transform ${
                    openSub === "work" ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </span>
              </button>
              {openSub === "work" && (
                <div
                  onMouseEnter={() => clearTimeout(closeTimer.current)}
                  onMouseLeave={handleMouseLeave}
                >
                  <SubMenu items={subWorksItems} isMobile={isMobile} />
                </div>
              )}
            </>
          ) : item.isContact ? (
            <button
              onClick={handleContactClick}
              className="block px-3 py-2 rounded-lg text-black hover:bg-black hover:text-white transition"
            >
              {item.label}
            </button>
          ) : (
            <a
              href={item.href}
              onClick={isMobile ? () => setMenuOpen(false) : undefined}
              className="block px-3 py-2 rounded-lg text-black hover:bg-black hover:text-white transition"
            >
              {item.label}
            </a>
          )}
        </li>
      ))}

      {user?.role === "admin" && (
        <li
          className="relative"
          onMouseEnter={!isMobile ? () => handleMouseEnter("admin") : undefined}
          onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        >
          <button
            onClick={() =>
              setOpenSub(openSub === "admin" ? null : "admin")
            }
            className="flex items-center justify-between w px-3 py-2 rounded-lg text-black hover:bg-black hover:text-white transition"
          >
            Admin
            <span
              className={`ml-2 transform transition-transform ${
                openSub === "admin" ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          </button>
          {openSub === "admin" && (
            <div
              onMouseEnter={() => clearTimeout(closeTimer.current)}
              onMouseLeave={handleMouseLeave}
            >
              <SubMenu items={adminItems} isMobile={isMobile} />
            </div>
          )}
        </li>
      )}
    </ul>
  );

  const showHamburger =
    isMobile || (!isMobile && isActive);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 lg:px-28 bg-[var(--color-primary)] py-4`}
    >
      <div className=" flex justify-between items-center">
        {!showHamburger ? (
          <>
            <a
              href="/"
              className="navName text-lg md:text-xl lg:text-2xl font-bold transition-colors text-black"
            >
              Bishir kdy
            </a>
            <div className="hidden sm:flex gap-6">
              <NavLinks isMobile={false} />
            </div>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={onCartClick}
                className="flex items-center gap-2 bg-black text-white cursor-pointer hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] px-4 py-2 rounded-lg transition"
              >
                <FaCartArrowDown />
                Cart
              </button>
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 bg-black text-white cursor-pointer hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] px-4 py-2 rounded-lg transition"
              >
                {!user ? (
                  <>
                    <IoLogIn /> Login
                  </>
                ) : (
                  <>
                    <IoMdLogOut /> Logout
                  </>
                )}
              </button>
            </div>
            {/* <div className="sm:hidden">
              <button
                id="hamburgerBtn"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="text-3xl text-black font-semibold transition"
              >
                <CgMenuRight  />
              </button>
            </div> */}
          </>
        ) : (
          <div className="w-full flex justify-end">
            <button
              id="hamburgerBtn"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className=" text-black cursor-pointer transition"
              style={{ background: "var(--color-primary)" }}
            >
              <CgMenuRight className="font-semibold text-3xl"  />
            </button>
          </div>
        )}
      </div>

      {menuOpen && (
        <div
          id="mobileMenu"
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-end z-50"
        >
          <div className="w-[75vw] max-w-xs h-full bg-[var(--color-primary)] shadow-lg flex flex-col pt-4 pb-6 px-6 relative">
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl text-black hover:bg-black cursor-pointer hover:text-[var(--color-primary)] transition rounded-full p-1"
            >
              <FaTimes />
            </button>
            <div className="mt-10 flex flex-col justify-between h-full">
              <NavLinks isMobile={true} />
              <div className="flex flex-col gap-3 mt-8">
                <button
                  onClick={() => {
                    onCartClick();
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg transition"
                >
                  <FaCartArrowDown /> Cart
                </button>
                <button
                  onClick={() => {
                    handleLogin();
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg transition"
                >
                  {!user ? (
                    <>
                      <IoLogIn /> Login
                    </>
                  ) : (
                    <>
                      <IoMdLogOut /> Logout
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;