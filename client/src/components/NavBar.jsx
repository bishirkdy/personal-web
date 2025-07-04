import React, { useState, useEffect } from "react";
import { FaTimes, FaBars, FaCartArrowDown } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = ({ onCartClick, onContactClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [adminSubOpen, setAdminSubOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleContactClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToContact: true } });
    } else {
      onContactClick();
    }
  };

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
    { label: "Work" },
    { isContact: true, label: "Contact" },
  ];

  const adminItems = [
    // { href: "/admin/", label: "Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    // { href: "/admin", label: "Settings" },
    { href: "/admin/create-project", label: "Add Project" },
    { href: "/admin/add-ai", label: "Add AI Prompts" },
  ];

  const subWorksItems = [
    { href: "/projects", label: "My Works" },
    { href: "/ai-prompts", label: "Ai Prompts" },
  ];

  const AdminLinks = ({ isMobile, onClick }) => {
    if (!user) return null;

    if (user.role === "admin") {
      return (
        <li className="relative">
          <button
            onClick={() => setAdminSubOpen((prev) => !prev)}
            className={`flex items-center justify-between w-full text-sm md:text-md text-black rounded-xl hover:bg-[var(--color-secondary)] p-2 hover:text-[var(--color-primary)] transition-colors duration-200 ${
              isMobile ? "text-lg" : "gap-2"
            }`}
          >
            Admin
            <span
              className={`ml-2 transform transition-transform ${
                adminSubOpen ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          </button>
          {adminSubOpen && (
            <ul
              className={`mt-2 ${
                isMobile
                  ? "flex flex-col"
                  : "absolute bg-[var(--color-primary)] rounded-lg shadow-lg mt-2 w-40 border border-gray-200 z-50"
              }`}
            >
              {adminItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block w-full text-left text-sm md:text-md text-black rounded-lg hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] px-3 py-2 transition-colors duration-200"
                    onClick={isMobile ? onClick : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }
    return null;
  };

  const NavLinks = ({ isMobile, onClick }) => (
    <ul
      className={`flex ${
        isMobile
          ? "flex-col pt-6"
          : "flex-row justify-around items-center gap-3 md:gap-8"
      }`}
    >
      {navItems.map((item) => (
        <li key={item.label} className="relative">
          {item.label === "Work" ? (
            <>
              <button
                onClick={() => setSubOpen((prev) => !prev)}
                className={`flex items-center justify-between w-full text-sm md:text-md text-black rounded-xl hover:bg-[var(--color-secondary)] p-2 hover:text-[var(--color-primary)] transition-colors duration-200 ${
                  isMobile ? "text-lg" : "gap-2"
                }`}
              >
                {item.label}
                <span
                  className={`ml-2 transform transition-transform ${
                    subOpen ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </span>
              </button>
              {subOpen && (
                <ul
                  className={`mt-2 ${
                    isMobile
                      ? "flex flex-col"
                      : "absolute bg-[var(--color-primary)] rounded-lg shadow-lg mt-2 w-28 border border-gray-200"
                  }`}
                >
                  {subWorksItems.map((sub) => (
                    <li key={sub.label}>
                      <a
                        href={sub.href}
                        className={`block w-full text-left text-sm md:text-md text-black rounded-lg hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] px-3 py-2 transition-colors duration-200 ${
                          isMobile ? "text-lg" : ""
                        }`}
                        onClick={isMobile ? onClick : undefined}
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : item.isContact ? (
            <button
              onClick={() => {
                handleContactClick();
                if (isMobile) onClick();
              }}
              className={`block text-sm md:text-md text-black rounded-xl hover:bg-[var(--color-secondary)] p-2 hover:text-[var(--color-primary)] transition-colors duration-200 ${
                isMobile ? "text-lg" : ""
              }`}
            >
              {item.label}
            </button>
          ) : (
            <a
              href={item.href}
              className={`block text-sm md:text-md text-black rounded-xl hover:bg-[var(--color-secondary)] p-2 hover:text-[var(--color-primary)] transition-colors duration-200 ${
                isMobile ? "text-lg" : ""
              }`}
              onClick={isMobile ? onClick : undefined}
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
      {user && (user.role === "admin" ) && (
        <AdminLinks isMobile={isMobile} onClick={onClick} />
      )}
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
          {!user ? (
            <>
              <IoLogIn />
              Login
            </>
          ) : (
            <>
              <IoMdLogOut />
              Logout
            </>
          )}
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
                  {!user ? (
                    <>
                      <IoLogIn />
                      Login
                    </>
                  ) : (
                    <>
                      <IoMdLogOut />
                      Logout
                    </>
                  )}
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