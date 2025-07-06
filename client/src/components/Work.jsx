import { useState } from "react";
import { useGetTopSixProjectQuery } from "../redux/api/projectApi";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useNavigate } from "react-router";
const Work = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetTopSixProjectQuery();
  const isMobile = window.innerWidth <= 768;
  if (isLoading) {
    return <h2 className="text-center pt-10">Loading...</h2>;
  }

  if (error) {
    return (
      <h2 className="text-center pt-10 text-red-600">Error loading projects</h2>
    );
  }

  return (
    <div className="bg-[var(--color-primary)] pt-10 px:4 lg:px-28 flex flex-col items-center justify-center">
        <div onClick={() => navigate("/projects")}
         className="cursor-pointer relative flex items-center justify-center gap-4 w-full mb-10 px-4 group">
              <h1 className="lg:text-4xl md:text-3xl text-xl font-bold text-nowrap">
                PROJECTS
              </h1>
              <hr className="border-3 border-gray-400 flex-grow" />
              <hr className="w-[5vw] group-hover:w-[8vw] group-active:w-[8vw] transform-border ease-in-out duration-300 border-3 border-[var(--color-secondary)] " />
             <FaArrowRightToBracket className="text-4xl hidden group-hover:block group-active:block transform-border ease-in-out duration-300 "/>
            </div>
      {/* <p className="text-center text-2xl font-bold max-w-xl w-[90vw] pt-2">
        Designs speak - Experiences perform <br /> Design driven by empathy.
        Built for experience.
      </p> */}
      <div className="w-full px-4 py-8">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {data?.map((work) => (
            <div
              key={work._id}
              className="relative group w-full overflow-hidden rounded-lg shadow aspect-video"
            >
              <img
                src={work.image}
                alt={work.name}
                className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105 group-active:scale-105
            group-hover:shadow-lg group-active:shadow-lg
            group-hover:rounded-lg group-active:rounded-lg
            group-hover:brightness-90 group-active:brightness-90
            group-hover:opacity-90 group-active:opacity-90
            rounded-lg
          "
                loading="loading..."
              />

              <div
                className="
          absolute bottom-0 left-0 right-0
          bg-[var(--color-secondary)] bg-opacity-50
          opacity-0 group-hover:opacity-100 group-active:opacity-100
          transition-opacity duration-300
          p-4 text-white
          flex flex-col justify-end
        "
              >
                <h2 className={`${isMobile ? "text-sm" : "text-lg"} font-bold`}>
                  {work.name}
                </h2>
                <p className="text-sm">
                  {isMobile
                    ? work.description.slice(0, 30)
                    : work.description.slice(0, 100)}
                  ...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
