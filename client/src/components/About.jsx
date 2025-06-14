import React from "react";
import web from "../assets/webDesign.jpeg";

const About = () => {
  return (
    <div className="relative pt-10 flex flex-col lg:flex-row shadow">
      <div
        className="
          absolute inset-0 w-full h-full
          bg-[url('https://websitedemos.net/illustrator-portfolio-04/wp-content/uploads/sites/1528/2025/03/about-bg.jpg')]
          bg-cover bg-center
          before:content-[''] before:absolute before:inset-0 before:w-full before:h-full
          before:bg-gradient-to-b before:from-black/80 before:to-black/70
        "
        aria-hidden="true"
      />
      <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-start">
        <div
          className="
            relative 
            w-[85vw] max-w-[16rem] sm:max-w-[18rem] md:max-w-[18rem]
            aspect-[13/17]
            translate-y-[-10rem]
            transition-transform
            duration-300
            rounded-[20%]
            overflow-hidden
            shadow-xl
            bg-amber-200
          "
        >
          <img
            src={web}
            className="w-full h-full object-cover rounded-[20%]"
            alt="About"
          />
        </div>
      </div>

      <div className="relative z-10 w-full lg:w-1/2 flex flex-col flex-wrap items-start translate-y-[-5rem] lg:translate-y-0 px-4 md:px-10 lg:px-0">
        <div className="p-2 border rounded-2xl text-white mt-8 lg:mt-0">
          <h1 className="text-lg font-bold">About</h1>
        </div>
        <h1 className="text-start text-3xl sm:text-4xl md:text-5xl font-bold savate-font w-full sm:w-[80%] pt-8 lg:pt-14 text-white">
          Designing Ideas <br /> Developing Impact
        </h1>
        <p className="text-start w-full sm:w-[90%] md:w-[80%] text-base sm:text-lg pt-4 pb-12 text-white">
          Hey there! I’m Bishir, a multidisciplinary creative blending
          design, code, and visual storytelling. With a passion for clean
          aesthetics and smart solutions, I craft engaging websites, intuitive
          user interfaces, bold graphics, and compelling video content that
          connect and inspire. From building seamless web experiences to
          designing standout brands and editing videos that tell a story, I
          bring both creative vision and technical precision to every project.
          Whether it's a full-stack web solution or a scroll-stopping social
          media clip, I’m here to make ideas come to life—beautifully and
          effectively.
        </p>
      </div>
    </div>
  );
};

export default About;