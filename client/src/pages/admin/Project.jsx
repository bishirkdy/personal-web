import React, { useState } from "react";
import { useNavigate } from "react-router";

const categories = [
  "Web Projects",
  "Simple Codes",
  "CSS Codes",
  "UI & UX Design",
  "Logo Design",
  "Letter Design",
  "Billboard Design",
  "Poster Design",
  "Brochure Design",
  "Magazine Design",
  "Stickers",
];
const software = [
  "illustration",
  "photoshop",
  "indesign",
  "premier",
  "figma",
  "code",
];
const Project = ({ newProject, isLoading, isError, text, _id }) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    price: 0,
    offerPrice: 0,
    category: "",
    image: null,
    zip: null,
    software: "",
  });
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setProject((prev) => ({ ...prev, image }));

    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setImagePreview(previewUrl);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProject((prev) => ({ ...prev, zip: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", project.name);
    formData.append("description", project.description);
    formData.append("price", project.price);
    formData.append("offerPrice", project.offerPrice);
    formData.append("category", project.category);
    formData.append("software", project.software);

    if (project.image) formData.append("image", project.image);
    if (project.zip) formData.append("zip", project.zip);

    try {
      if (_id) {
        await newProject({ _id , formData }).unwrap();
        navigate("/projects");
      } else {
        await newProject(formData).unwrap();
        setProject({
          name: "",
          description: "",
          price: 0,
          offerPrice: 0,
          category: "",
          image: null,
          zip: null,
          software: "",
        });
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-primary)] px-4 py-16">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {text}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="px-2 py-1">
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required={!_id}
            />
          </div>

          <div className="px-2 py-1">
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required={!_id}
            />
          </div>

          <div className="px-2 py-1">
            <select
              name="category"
              value={project.category}
              onChange={handleChange}
                required={!_id}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat.toLowerCase().replace(/ & /g, "&")}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="px-2 py-1">
            <select
              name="software"
              value={project.software}
              onChange={handleChange}
                required={!_id}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="" disabled>
                Select a software
              </option>
              {software.map((soft) => (
                <option
                  key={soft}
                  value={soft.toLowerCase().replace(/ & /g, "&")}
                >
                  {soft}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 p-2">
              <input
                type="number"
                name="price"
                value={project.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required={!_id}
              />
            </div>
            <div className="flex-1 p-2">
              <input
                type="number"
                name="offerPrice"
                value={project.offerPrice}
                onChange={handleChange}
                placeholder="Offer Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required={!_id}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="p-2  border rounded-lg border-gray-400 w-full">
              <label className="block font-medium mb-1">
                Upload layout image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
                required={!_id}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="mt-2 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="p-2 border  rounded-lg border-gray-400 w-full">
              <label className="block font-medium mb-1">
                Upload main file (ZIP, PDF, etc.)
              </label>
              <input
                type="file"
                accept=".zip,.pdf,.rar"
                onChange={handleFileChange}
                className="w-full"
                  required={!_id}
              />
              {project.zip && (
                <p className="mt-1 text-sm text-gray-600">
                  Selected: {project.zip.name}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Project;
