import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import router from "./Router.jsx";
import { RouterProvider } from "react-router-dom";
import { ScrollProvider } from "./components/ScrollContact.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ScrollProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </ScrollProvider>
  </Provider>
);
