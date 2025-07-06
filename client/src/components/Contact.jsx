import React, { useRef, useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";

const Contact = () => {
  const [sendableData , setSendableData] =  useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const [visible, setVisible] = useState(false);
  const [sending, setSending] = useState(false);

  const [sent, setSent] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 1600);
      e.target.reset();
    }, 1200);
  };

  return (
    <div
      ref={ref}
      className="bg-[var(--color-primary)] min-h-screen flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        <div
          className={`text-center md:text-left space-y-6 transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}
          `}
        >
          <div className="inline-block border px-4 py-2 rounded-2xl shadow-md animate-fade-down">
            <h1 className="text-2xl font-bold tracking-wide">Contact Me</h1>
          </div>
          <RiCustomerService2Fill className="text-[6rem] text-[var(--color-secondary)] mx-auto md:mx-0 animate-bounce-slow" />
          <p className="text-2xl font-semibold">
            Open to new opportunities. <br className="hidden sm:block" />
            Just say hello!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md bg-white/80 p-8 rounded-3xl shadow-2xl border border-white/60 backdrop-blur-md transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}
            ${sent ? "ring-2 ring-green-400" : ""}
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
            disabled={sending}
            className={`mt-6 w-full flex items-center justify-center gap-2 bg-[var(--color-secondary)] text-white font-semibold p-3 rounded-lg shadow cursor-pointer hover:bg-white  hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)]
              focus:bg-white  focus:text-[var(--color-secondary)] focus:border-[var(--color-secondary)]
              border border-transparent transition-all duration-300 text-lg group
              ${sending ? "opacity-60 cursor-not-allowed" : ""}
            `}
          >
            <IoIosSend className={`${sending ? "animate-send" : ""}`} />
            <span className="transition-transform group-hover:translate-x-1">
              {sending ? "Sending..." : sent ? "Sent!" : "Send"}
            </span>
          </button>
          {sent && (
            <div className="mt-4 text-center text-green-600 font-semibold animate-fade-in">
              Thank you! Your message has been sent.
            </div>
          )}
        </form>
      </div>
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 2.2s infinite; }
        @keyframes fade-down { from { opacity: 0; transform: translateY(-18px);} to { opacity: 1; transform: translateY(0);} }
        .animate-fade-down { animation: fade-down 0.8s; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.9s; }
        @keyframes send { 0% { transform: translateX(0); } 50% { transform: translateX(8px); } 100% { transform: translateX(0); } }
        .animate-send { animation: send 0.7s linear infinite; }
      `}</style>
    </div>
  );
};

export default Contact;