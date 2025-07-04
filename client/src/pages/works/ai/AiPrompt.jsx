import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useGetAiProjectQuery } from "../../../redux/api/aiProjectApi";
import { useDeleteAiPromptMutation } from "../../../redux/api/aiProjectApi";
import { FaCopy } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";

const AiPrompt = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q" || ""));
  const [selectedSoftware, setSelectedSoftware] = useState(
    searchParams.get("software" || "")
  );

  const [filterActive, setFilterActive] = useState(false);
  const { data, error, isLoading , refetch } = useGetAiProjectQuery();
  const [deleteAiPrompt, { isLoading: deleteLoading, isError: deleteError }] =
    useDeleteAiPromptMutation();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  const allProject = data?.data
    ? Array.from(new Set(data.data.map((d) => d.software).filter(Boolean)))
    : [];

  const updateSearchParams = (term, software) => {
    const params = new URLSearchParams();
    if (term) params.set("q", term);
    if (software) params.set("software", software);
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    updateSearchParams(term, selectedSoftware);
  };

  const filteredProjects = data?.data?.filter((d) => {
    const softwareMatch = !selectedSoftware || d.software === selectedSoftware;

    const searchMatch =
      !searchTerm ||
      d.software.toLowerCase().includes(searchTerm.toLowerCase());

    return softwareMatch && searchMatch;
  });
  const uniqueSoftwares = Array.from(
    new Set(data?.data.map((item) => item.software))
  );

  const handleSoftwareChange = (soft) => {
    setSelectedSoftware(soft);
    updateSearchParams(searchTerm, soft);
  };

  const handleFilterBtn = () => {
    setFilterActive(!filterActive);
  };

  const handleDeletePrompt = async (_id) => {
    try {
      await deleteAiPrompt(_id).unwrap();
      alert("Prompt deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete prompt:", error);
      alert("Failed to delete prompt. Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-primary)]">
      <div className="w-full bg-[var(--color-primary)]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[var(--color-primary)] py-4 px-4 md:px-8 lg:px-32">
          <button
            onClick={handleFilterBtn}
            className="flex flex-row items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer md:w-1/4 w-full"
            aria-label="Open Filter"
          >
            <IoFilterSharp className="text-[var(--color-secondary)] text-lg" />
            <span className="text-gray-400 font-medium">Filter</span>
          </button>

          <div className="flex flex-row items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 md:w-3/4 w-full">
            <IoMdSearch className="text-[var(--color-secondary)] text-xl" />
            <input
              type="text"
              placeholder="Search title or description..."
              className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 font-medium"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full bg-[var(--color-primary)] py-4 px-4 md:px-8 lg:px-32 pb-16">
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
          <aside
            className={`${
              filterActive ? "block" : "hidden"
            } w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-lg transition-all duration-200`}
          >
            <div>
              <div className="flex flex-col gap-3">
                {uniqueSoftwares.map((soft, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-all cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="software"
                      checked={selectedSoftware === soft}
                      onChange={() => handleSoftwareChange(soft)}
                      className="accent-[var(--color-secondary)] w-4 h-4"
                    />
                    <span>{soft}</span>
                  </label>
                ))}
                <button
                  className="text-xs text-gray-400 mt-2 underline hover:text-[var(--color-secondary)]"
                  onClick={() => {
                    setSelectedSoftware("");
                    updateSearchParams(searchTerm, "");
                  }}
                  type="button"
                >
                  Clear tool
                </button>
              </div>
            </div>
          </aside>

          <main className={`w-full ${filterActive ? "md:w-3/4" : "w-full"}`}>
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <span className="text-gray-500">Loading prompts...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <span className="text-red-500">Failed to load ai prompts.</span>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 ${
                  filterActive
                    ? "sm:grid-cols-2 lg:grid-cols-3"
                    : "sm:grid-cols-2 lg:grid-cols-4"
                } gap-6`}
              >
                {filteredProjects && filteredProjects.length > 0 ? (
                  filteredProjects.map((prompt) => (
                    <div
                      key={prompt._id}
                      className="bg-white relative rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] flex flex-col"
                    >
                      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                        <img
                          src={prompt.image}
                          alt={prompt._id}
                          loading="Loading"
                          className="w-full h-full object-cover object-center"
                          style={{ aspectRatio: "1 / 1" }}
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex flex-row  flex-wrap gap-2 mt-2">
                          <span className="bg-[var(--color-primary-light,#e0e7ff)] text-xs rounded-lg px-2 py-1 text-[var(--color-secondary)] font-medium">
                            {prompt.software}
                          </span>
                          <button className="flex gap-2 items-center cursor-pointer hover:bg-white hover:text-[var(--color-secondary)] bg-[var(--color-secondary)] text-xs rounded-lg px-2 py-1 text-white font-medium">
                            <FaCopy />
                            Copy Prompt
                          </button>
                        </div>
                      </div>
                      {isAdmin && (
                        <MdDeleteForever
                          onClick={() => handleDeletePrompt(prompt._id)}
                          className="absolute right-2 top-2 text-2xl text-red-500 hover:scale-105 cursor-pointer hover:text-red-800"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center min-h-[200px]">
                    <span className="text-gray-400">No prompt found.</span>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AiPrompt;
