import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetAllProjectQuery } from "../../../redux/api/projectApi";
import { FaCopy } from "react-icons/fa";

// const software = [
//   "illustration",
//   "photoshop",
//   "indesign",
//   "premier",
//   "figma",
//   "code",
// ];
const AiPrompt = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q" || ""));
//   const [selectedSoftware, setSelectedSoftware] = useState(
//     searchParams.get("software" || "")
//   );
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.getAll("category")
  );

  const [filterActive, setFilterActive] = useState(false);
  const { data, error, isLoading } = useGetAllProjectQuery();
  const allCategories = data?.project
    ? Array.from(new Set(data.project.map((p) => p.category).filter(Boolean)))
    : [];

  const navigate = useNavigate();
  const updateSearchParams = (term, categories, software) => {
    const params = new URLSearchParams();
    if (term) params.set("q", term);
    if (software) params.set("software", software);
    categories.forEach((cat) => params.append("category", cat));
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    updateSearchParams(term, selectedCategories, selectedSoftware);
  };

  const filteredProjects = data?.project?.filter((project) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(project.category);

    // const softwareMatch =
    //   !selectedSoftware || project.software === selectedSoftware;

    const searchMatch =
      !searchTerm ||
      (project.name &&
        project.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.description &&
        project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.price && project.price.toString().includes(searchTerm)) ||
      (project.offerPrice &&
        project.offerPrice.toString().includes(searchTerm));

    return categoryMatch && searchMatch;
  });

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    updateSearchParams(searchTerm, updatedCategories, selectedSoftware);
  };
  const handleSoftwareChange = (soft) => {
    setSelectedSoftware(soft);
    updateSearchParams(searchTerm, selectedCategories, soft);
  };
  const handleFilterBtn = () => {
    setFilterActive(!filterActive);
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
          {/* <aside
            className={`${
              filterActive ? "block" : "hidden"
            } w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-lg transition-all duration-200`}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Categories
              </h2>
              <hr className="border-gray-200 mb-4" />
              <div className="flex flex-col gap-3">
                {allCategories.map((category, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-all cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="accent-[var(--color-secondary)] w-4 h-4"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Tools
              </h2>
              {/* <hr className="border-gray-200 mb-4" /> */}
              {/* <div className="flex flex-col gap-3">
                {software.map((soft, index) => (
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
                    updateSearchParams(searchTerm, selectedCategories, "");
                  }}
                  type="button"
                >
                  Clear tool
                </button>
              </div> */}
            {/* </div>
          </aside>  */}


          <main className={`w-full ${filterActive ? "md:w-3/4" : "w-full"}`}>
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <span className="text-gray-500">Loading projects...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <span className="text-red-500">Failed to load projects.</span>
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
                  filteredProjects.map((project) => (
                    <div
                      key={project._id}
                      onClick={() => navigate(`/projects/${project._id}`)}
                      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] flex flex-col"
                    >
                      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                        <img
                          src={project.image}
                          alt={project.title || project.id}
                          loading="Loading"
                          className="w-full h-full object-cover object-center"
                          style={{ aspectRatio: "1 / 1" }}
                        />
                      </div>
                      <div className="p-4">
 
                        <div className="flex flex-row  flex-wrap gap-2 mt-2">
                          {project.category && (
                            <span className="bg-[var(--color-primary-light,#e0e7ff)] text-xs rounded-lg px-2 py-1 text-[var(--color-secondary)] font-medium">
                              {project.category}
                            </span>
                          )}
                            <button className="flex gap-2 items-center cursor-pointer hover:bg-white hover:text-[var(--color-secondary)] bg-[var(--color-secondary)] text-xs rounded-lg px-2 py-1 text-white font-medium">
                                <FaCopy/>
                                Copy Prompt
                            </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center min-h-[200px]">
                    <span className="text-gray-400">No projects found.</span>
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
