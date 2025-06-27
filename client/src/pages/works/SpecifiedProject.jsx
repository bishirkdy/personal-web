import React from "react";
import { useProjectDetailsQuery } from "../../redux/api/projectApi";
import { useDeleteProjectMutation } from "../../redux/api/projectApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";

const SpecifiedProject = () => {
  const { id } = useParams();
  console.log(id);
  
  const { data, isLoading, error } = useProjectDetailsQuery(id);
  console.log(data);
  
  const [deleteData, { isLoading: deleteLoading, isError: deleteError }] =
    useDeleteProjectMutation();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user.role == "admin";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (isLoading) return null;

  const selectedData = data?.data;
  console.log(selectedData);
  
  if (!selectedData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Project Not Found
        </h1>
        <p className="mb-4 text-gray-500">
          The requested project could not be located.
        </p>
      </div>
    );
  }
  const handleDelete = async () => {
    await deleteData(id).unwrap();
    navigate("/projects");
  };
  const addToCartHandler = async () => {
    await dispatch(addToCart({projects : selectedData}))
    navigate("/projects")
  }

  return (
    <div className="min-h-screen bg-[var(--color-primary)] px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-3xl overflow-hidden">
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={selectedData.image}
            alt={selectedData.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            {selectedData.name}
          </h1>

          <p className="text-gray-700 text-base sm:text-md leading-relaxed mb-6">
            {selectedData.description ||
              `This project combines creativity and modern tools to deliver an outstanding user experience. Ideal for portfolios, real-world learning, or customization.`}
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
              Category: {selectedData.category}
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
              Price: ₹{selectedData.price}
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-medium">
              Offer: ₹{selectedData.offerPrice}
            </span>
          </div>

          {isAdmin ? (
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigate(`/update-project/${selectedData._id}`)}
                className="px-6 py-3 bg-[var(--color-secondary)] text-white font-semibold rounded-lg hover:bg-blue-900 cursor-pointer transition"
              >
                Update
              </button>

              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white font-semibold border cursor-pointer border-gray-300 rounded-lg hover:bg-red-900 transition"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="flex gap-4 mt-6">
              <button onClick={addToCartHandler} 
              className="px-6 py-3 bg-[var(--color-secondary)] text-white font-semibold rounded-lg hover:bg-blue-900 cursor-pointer transition">
                Add To Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecifiedProject;
