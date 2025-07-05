import React, { useEffect, useRef, useState } from "react";
import profile from "../assets/profile.jpg";

const Header = () => {
  const [text , setText] = useState("")
  const message = "HELLO! I'M BISHIR"
  const typingIntervalRef = useRef(null);
  const indexRef = useRef(0);

  const startTyping = () => {
    clearInterval(typingIntervalRef.current);
    setText("")
    indexRef.current = 0;

    typingIntervalRef.current = setInterval(() => {
      setText((prev) => {
        const next = prev + message[indexRef.current];
        indexRef.current ++;
        if (indexRef.current >= message.length) {
          clearInterval(typingIntervalRef.current);
        }
        return next;
      } , [3000]);
    }, 100)
  }
  useEffect(() => {
    startTyping();
    return () => {
      clearInterval(typingIntervalRef.current);
    };
  }, [message]);
  useEffect(() => {
    const handleScroll = () => {
      startTyping();
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  })
  return (
    <header className="bg-[var(--color-primary)] px-4 lg:pl-28 mt-[60px] lg:mt-[65px] min-h-[calc(100vh-65px)] flex flex-col md:flex-row items-center">
      <div className="w-full md:w-[50%] md:pr-10">
        <div className="px- py-8 flex flex-col items-center text-center md:items-start md:text-start gap-4">
          <h2 className="font-semibold text-sm md:text-base text-black">👋{text}</h2>
          <h1 className="savate-font  text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight text-black">
            Bringing your vision to life through connection
          </h1>
          <h6 className="font-[var(--main-font)] text-xs xs:text-sm  md:text-base text-black opacity-90">
            I am a web developer, graphic designer, and UI/UX specialist focused
            on delivering visually impactful and user-friendly digital solutions
          </h6>
          <button className="p-2 bg-[var(--color-secondary)] text-white w-[140px] cursor-pointer hover:scale-95 xs:w-[160px] md:w-[200px] rounded-lg shadow hover:bg-opacity-90 transition">
            Let's connect
          </button>
        </div>
      </div>

      <div className="w-full md:w-[50%] flex items-center justify-center md:justify-end pb-8 pt-4 md:pr-8 lg:pr-24">
        <div
          className="
            relative
            w-[80vw] sm:w-[50vw] md:w-[42vw] lg:w-[32vw]
            h-[85vw] sm:h-[55vw] md:h-[46vw] lg:h-[35vw]
            max-w-[400px] max-h-[500px]
            rounded-[40%]
            shadow-lg hover:glow
            hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]
            flex items-center justify-center
          "
        >
          <img
            src={profile}
            className="w-full h-full object-cover rounded-[40%] transition-transform duration-300 "
            alt="Bishir profile"
            loading="loading"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;