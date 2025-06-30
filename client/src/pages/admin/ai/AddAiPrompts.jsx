import React, { useState } from "react";

const AddAiPrompts = () => {
  const [image, setImage] = useState(null);
  const [software, setSoftware] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Image:", image);
    console.log("Software:", software);
    console.log("Prompt:", prompt);

    setImage(null);
    setSoftware("");
    setPrompt("");
    alert("Prompt added!");
  };

  return (
    <div className="w-full bg-[var(--color-primary)] flex items-center py-10 justify-center">
      <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Add New AI Prompt
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-3 rounded-lg max-h-40 object-cover"
              />
            )}
          </div>

          
            <input
              type="text"
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
              placeholder="Enter software name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            />

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter the AI prompt"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              rows={10}
              required
            />

          <button
            type="submit"
            className="bg-[var(--color-secondary)] text-[var(--color-primary)] py-2 px-4 rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
          >
            Add Prompt
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAiPrompts;
