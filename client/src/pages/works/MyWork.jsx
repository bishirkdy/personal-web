import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useGetAllProjectQuery } from "../../redux/api/projectApi";

const software = [
  "illustration",
  "photoshop",
  "indesign",
  "premier",
  "figma",
  "code",
];
const MyWork = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q" || ""));
  const [selectedSoftware, setSelectedSoftware] = useState(
    searchParams.get("software" || "")
  );
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
    <div className="min-h-screen pt-16  flex flex-col bg-[var(--color-primary)]">
      <div className="w-full bg-[var(--color-primary)]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[var(--color-primary)] py-4 px-4 md:px-8 lg:px-28">
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

      <div className="flex-1 w-full bg-[var(--color-primary)] py-4 px-4 md:px-8 lg:px-28 pb-16">
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
          <aside
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
              <hr className="border-gray-200 mb-4" />
              <div className="flex flex-col gap-3">
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
              </div>
            </div>
          </aside>

          <main
            className={`w-full ${
              filterActive ? "md:w-3/4" : "w-full"
            }`}
          >
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
                className={`grid gap-6 grid-cols-1
        ${
          filterActive
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
              >
                {filteredProjects && filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div
                      key={project._id}
                      onClick={() => navigate(`/projects/${project._id}`)}
                      className="bg-white rounded-xl shadow hover:scale-[1.02] transition-transform cursor-pointer flex flex-col overflow-hidden group"
                    >
                      {/* 16:9 Thumbnail */}
                      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={project.image}
                          alt={project.title || project.id}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Optional subtle overlay on hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content below thumbnail */}
                      <div className="p-3 space-y-1 flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-800 truncate">
                          {project.name}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.category && (
                            <span className="bg-[var(--color-primary-light,#e0e7ff)] text-xs rounded-full px-2 py-0.5 text-[var(--color-secondary)]">
                              {project.category}
                            </span>
                          )}
                          {project.software && (
                            <span className="bg-gray-100 text-xs rounded-full px-2 py-0.5 text-gray-500">
                              {project.software}
                            </span>
                          )}
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

export default MyWork;
