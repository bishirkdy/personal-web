import React, { useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";

const Contact = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-[var(--color-primary)] min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Heading */}
        <div className="text-center md:text-left space-y-6">
          <div className="inline-block border px-4 py-2 rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold tracking-wide">Contact Me</h1>
          </div>
          <RiCustomerService2Fill className="text-[6rem] text-[var(--color-secondary)] mx-auto md:mx-0" />
          <p className="text-2xl font-semibold">
            Open to new opportunities. <br className="hidden sm:block" />
            Just say hello!
          </p>
        </div>

        {/* Right Side - Form */}
        <form
          className={`w-full max-w-md bg-white/80 p-8 rounded-3xl shadow-2xl border border-white/60 backdrop-blur-md transition-all duration-700 ease-out
            ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}
          `}
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none transition-all duration-300 shadow-sm"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none transition-all duration-300 shadow-sm"
              required
            />
            <input
              type="tel"
              placeholder="Phone no"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none transition-all duration-300 shadow-sm"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none transition-all duration-300 shadow-sm resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full flex items-center justify-center gap-2 bg-[var(--color-secondary)] text-white font-semibold p-3 rounded-lg shadow hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)] border border-transparent transition-all duration-300 text-lg group"
          >
            <IoIosSend />
            <span className="transition-transform group-hover:translate-x-1">
              Send
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
