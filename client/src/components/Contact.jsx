import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";

const Contact = () => {
  // Simple animation for the form on mount
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-[var(--color-primary)] pt-10 pb-20 flex flex-col items-center justify-center min-h-screen">
      <div className="p-2 border rounded-2xl shadow-lg mb-6">
        <h1 className="text-lg font-bold mb-6 tracking-wider">Contact Me</h1>
      </div>
      <p className="text-center text-2xl font-bold max-w-xl w-[90vw] pt-2">
        Open to new opportunities <br/>  Just say hello!
      </p>
      <div className="flex flex-col items-center justify-center pt-8 w-full max-w-7xl px-4">
        <form
          className={`w-full flex flex-col gap-4 max-w-md bg-white/80 p-8 rounded-3xl shadow-2xl border border-white/60 backdrop-blur-md
            transition-all duration-700 ease-out
            ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}
          `}
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none transition-all duration-300 shadow-sm"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none transition-all duration-300 shadow-sm"
              required
            />
            <input
              type="tel"
              placeholder="Phone no"
              className="w-full p-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none transition-all duration-300 shadow-sm"
            />
            <textarea
              placeholder="Message"
              className="w-full p-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none transition-all duration-300 shadow-sm resize-none"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full  flex flex-row items-center justify-center gap-2 bg-[var(--color-secondary)] text-white font-semibold p-3 rounded-lg shadow hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)] border border-transparent transition-all duration-300 tracking-wide text-lg"
          >
            <IoIosSend />
            <span className="inline-block transition-transform group-hover:translate-x-1">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;