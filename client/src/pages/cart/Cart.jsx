const Cart = ({ open, onClose, cartItems = { items: [], totalPrice: 0 } }) => {
  const items = Array.isArray(cartItems.items) ? cartItems.items : [];
  const isEmpty = items.length === 0;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-opacity-50 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`fixed top-0 right-0 w-full max-w-xs sm:w-96 h-full bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          <button
            className="text-gray-400 hover:text-gray-700 text-2xl"
            onClick={onClose}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
          {isEmpty ? (
            <p className="text-gray-400 text-center mt-20 text-lg">
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item._id || item.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-100 bg-gray-50"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-gray-800 truncate">
                        {item.name}
                      </p>
                      <button
                        onClick={() => console.log("Remove", item._id || item.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-0.5 cursor-pointer border border-red-200 rounded-lg transition"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mb-1">
                      <span className="text-[var(--color-secondary)] font-bold text-lg">
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium border border-gray-200">
                        {item.category}
                      </span>
                      <span className="bg-gray-100 text-indigo-600 px-2 py-0.5 rounded text-xs font-medium border border-gray-200">
                        {item.software}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t px-6 py-4 bg-white sticky bottom-0 z-10 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-lg text-gray-800">Total:</span>
            <span className="font-bold text-xl text-[var(--color-secondary)]">
              ₹{cartItems.totalPrice ?? 0}
            </span>
          </div>
          <button
            className={`w-full bg-[var(--color-secondary)] text-white py-2 rounded-lg font-semibold border border-[var(--color-secondary)] transition ${
              isEmpty
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white hover:text-[var(--color-secondary)]"
            }`}
            disabled={isEmpty}
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Cart;
