import React from "react";
import ux from "../assets/ux.jpeg";

const works = [
  { id: 1, img: ux },
  { id: 2, img: ux },
  { id: 3, img: ux },
  { id: 4, img: ux },
  { id: 5, img: ux },
  { id: 6, img: ux },
  { id: 7, img: ux },
  { id: 8, img: ux },
  { id: 9, img: ux },
];

const Work = () => {
  return (
    <div className="bg-[var(--color-primary)] pt-10 pb-50 flex flex-col items-center justify-center">
      <div className="p-2 border rounded-2xl">
        <h1 className="text-lg font-bold mb-12">My Works</h1>
      </div>
      <p className="text-center text-2xl font-bold max-w-xl w-[90vw] pt-2">
        Designs speak - Experiences perform <br /> Design driven by empathy. Built for experience.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8 pt-12 w-full max-w-7xl px-4">
        {works.map((work) => (
          <div
            key={work.id}
            className="relative flex flex-col items-center justify-center"
          >
            <div className="w-full aspect-square max-w-[350px] p-[10px] sm:p-[16px] rounded-[20%] border-4 border-black overflow-hidden shadow-lg">
              <img
                src={work.img}
                className="w-full h-full object-cover rounded-[20%] transition-transform duration-300 hover:scale-105"
                alt={`Work ${work.id}`}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;