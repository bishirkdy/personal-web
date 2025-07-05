import graphic from "../assets/graphic.jpeg";
import webDesign from "../assets/webDesign.jpeg";
import dev from "../assets/dev.jpeg";
import webSolution from "../assets/webSolution.jpeg";
import ux from "../assets/ux.jpeg";
import video from "../assets/video.jpeg";
import { useState } from "react";

const services = [
  { src: webDesign, label: "WEB DESIGN" },
  { src: dev, label: "WEB DEVELOPMENT" },
  { src: webSolution, label: "WEB SOLUTION" },
  { src: graphic, label: "GRAPHIC DESIGNING" },
  { src: ux, label: "UI&UX DESIGNING" },
  { src: video, label: "VIDEO EDITING" },
];

const Service = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (idx) => {
    console.log(idx);

    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="bg-[var(--color-secondary)] py-12 flex flex-col items-center px-4 lg:px-28 sm:px-8 md:px-12">
      <div className="border border-white rounded-2xl px-6 py-2 mb-6">
        <h1 className="text-lg font-bold text-white">My Services</h1>
      </div>
      <p className="text-white text-center text-2xl font-bold max-w-xl w-full mb-8">
        Beyond visual design <br /> We craft user-centered digital experiences
      </p>

      <div
        className="
        flex gap-4 overflow-x-auto
         w-full items-center
        
         "
        // style={{ WebkitOverflowScrolling: "touch" }}
      >
        {services.map((service, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={service.label}
              onClick={() => handleClick(idx)}
              className={`
                relative rounded-3xl overflow-hidden shadow-lg cursor-pointer
                transition-all duration-500 ease-in-out flex-shrink-0
                scroll-snap-align-center
                ${isActive ? "flex-[2] md:flex-[2.5]" : "flex-1"}
                group
              `}
              style={{
                minWidth: isActive ? "230px" : "140px",
                maxWidth: isActive ? "400px" : "180px",
              }}
            >
              <img
                src={service.src}
                alt={service.label}
                className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover transition-all duration-500"
              />
              <div
                className="
                absolute inset-0 flex flex-col items-center justify-end p-4
                bg-gradient-to-t from-black/80 via-black/40 to-transparent
              "
              >
                <h3 className="text-white text-lg font-bold">
                  {service.label}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
