import { useGetTopSixAiProjectsQuery } from "../../../redux/api/aiProjectApi";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useNavigate } from "react-router";

const AiProject = () => {
  const isMobile = window.innerWidth <= 768;
  const { data, isLoading, error } = useGetTopSixAiProjectsQuery();
  const navigate = useNavigate();
  if (isLoading) {
    return <h2 className="text-center pt-10">Loading...</h2>;
  }

  if (error) {
    return (
      <h2 className="text-center pt-10 text-red-600">Error loading projects</h2>
    );
  }

  return (
    <div className="bg-[var(--color-primary)] pt-10 px:4 lg:px-28 flex flex-col">
      <div onClick={() => navigate("/ai-prompts")}
       className="cursor-pointer relative flex items-center justify-center gap-4 w-full mb-12 px-4 group">
        <h1 className="lg:text-4xl md:text-3xl text-xl font-bold text-nowrap">
          AI WORKS
        </h1>
        <hr className="border-3 border-gray-400 flex-grow" />
        <hr className="w-[5vw] group-hover:w-[8vw] group-active:w-[8vw] transform-border ease-in-out duration-300 border-3 border-[var(--color-secondary)] " />
       <FaArrowRightToBracket className="text-4xl hidden group-hover:block group-active:block transform-border ease-in-out duration-300 "/>
      </div>

      <div className="w-full px-4 py-8 pb-50">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {data?.data?.map((work) => (
            <div
              key={work._id}
              tabIndex="0"
              className="relative group w-full overflow-hidden rounded-lg shadow aspect-square cursor-pointer focus:outline-none"
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
                group-hover:scale-105
                group-active:scale-105
                focus:scale-105
                rounded-lg
              "
                loading="loading..."
              />

              <div
                className="
                absolute bottom-0 left-0 right-0
                bg-white bg-opacity-50
                opacity-0 translate-y-full
                group-hover:opacity-100 group-hover:translate-y-0
                group-active:opacity-100 group-active:translate-y-0
                focus:opacity-100 focus:translate-y-0
                transition-all duration-500
                p-4 text-[var(--color-secondary)]
                flex flex-col justify-end
                rounded-lg
              "
              >
                <h2 className={`${isMobile ? "text-sm" : "text-lg"} font-bold`}>
                  Prompt
                </h2>
                <p className="text-sm">{work.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiProject;
