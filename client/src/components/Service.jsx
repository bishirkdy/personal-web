import React from "react";
import profile from "../assets/profile.jpg";
import graphic from "../assets/graphic.jpeg";
import webDesign from "../assets/webDesign.jpeg";
import dev from "../assets/dev.jpeg";
import webSolution from "../assets/webSolution.jpeg";
import ux from "../assets/ux.jpeg";
import video from "../assets/video.jpeg";

const services = [
  {
    src: webDesign,
    label: "WEB DESIGN",
  },
  {
    src: dev,
    label: "WEB DEVELOPMENT",
    extraClass: "md:translate-y-12",
  },
  {
    src: webSolution,
    label: "WEB SOLUTION",
  },
  {
    src: graphic,
    label: "GRAPHIC DESIGNING",
  },
  {
    src: ux,
    label: "UI&UX DESIGNING",
    extraClass: "md:translate-y-12",
  },
  {
    src: video,
    label: "VIDEO EDITING",
  },
];

const Service = () => {
  return (
    <div className="bg-[var(--color-secondary)] pt-10 pb-20 flex flex-col items-center justify-center">
      <div className="p-2 border rounded-2xl text-white">
        <h1 className="text-lg font-bold text-white mb-12">My Services</h1>
      </div>
      <p className="text-white text-center text-2xl font-bold max-w-xl w-[90vw] pt-2">
        Beyond visual design <br /> We craft user-centered digital experiences
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-8 pt-12 w-full max-w-7xl px-4">
        {services.map((service, idx) => (
          <div
            key={service.label}
            className={`
              relative shadow-2xl hover:shadow-3xl duration-300 ease-in-out 
              rounded-[30%] overflow-hidden transition-transform hover:scale-105
              flex flex-col 
              ${service.extraClass || ""}
            `}
          >
            <img
              className="w-full h-[350px] sm:h-[350px] md:h-[420px] object-cover"
              src={service.src}
              alt={service.label}
            />
            <div className="absolute bottom-0 left-0 w-full h-full flex flex-col items-center justify-end gap-2 p-4 text-center bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <h3 className="text-white text-lg font-bold">{service.label}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;