import { useGetTopSixProjectQuery } from "../redux/api/projectApi";

const Work = () => {
  const { data, isLoading, error } = useGetTopSixProjectQuery();

  if (isLoading) {
    return <h2 className="text-center pt-10">Loading...</h2>;
  }
console.log(data);

  if (error) {
    return <h2 className="text-center pt-10 text-red-600">Error loading projects</h2>;
  }

  return (
    <div className="bg-[var(--color-primary)] pt-10 pb-50 flex flex-col items-center justify-center">
      <div className="p-2 border mb-12 rounded-2xl">
        <h1 className="text-lg font-bold">My Works</h1>
      </div>
      <p className="text-center text-2xl font-bold max-w-xl w-[90vw] pt-2">
        Designs speak - Experiences perform <br /> Design driven by empathy. Built for experience.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8 pt-12 w-full max-w-7xl px-4">
        {data?.map((work) => (
          <div
            key={work._id}
            className="relative flex flex-col items-center justify-center"
          >
            <div className="w-full aspect-square max-w-[350px] p-[10px] sm:p-[16px] rounded-[20%] border-4 border-black overflow-hidden shadow-lg">
              <img
                src={work.image}
                className="w-full h-full object-cover rounded-[20%] transition-transform duration-300 hover:scale-105"
                alt={work.name}
                loading="loading..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
