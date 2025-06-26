import React from "react";

const Cart = ({ open, onClose, cartItems = [] }) => {

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? " pointer-events-auto" : "opacity-0 pointer-events-none"
        } bg-opacity-50`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            className="text-gray-400 hover:text-gray-700 text-2xl"
            onClick={onClose}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        {item.qty} × ${item.price}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:underline text-sm"
                    disabled
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg">Total:</span>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Cart;