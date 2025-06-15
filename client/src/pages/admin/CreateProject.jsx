import React, { useState } from "react";

const CreateProject = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    price: 0,
    offerPrice: 0,
    category: "",
    image: null,
    file: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProject((prev) => ({ ...prev, file }));

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setProject((prev) => ({ ...prev, image }));

    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(project);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-primary)] px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create New Project
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-2">
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="p-2">
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="p-2">
            <input
              type="text"
              name="category"
              value={project.category}
              onChange={handleChange}
              placeholder="Enter project category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
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
                required
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
                required
              />
            </div>
          </div>
          <div className="flex gap-2 p-2 ">
            <div className="p-2 border rounded-lg border-gray-400">
              <label className="block font-medium mb-1">Upload layout image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="p-2 border rounded-lg border-gray-400">
              <label className="block font-medium mb-1">
                Upload main file (PDF, etc.)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
