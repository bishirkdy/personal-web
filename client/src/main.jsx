import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import router from "./Router.jsx";
import { RouterProvider } from "react-router-dom";
import {ScrollProvider} from './components/ScrollContact.jsx'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ScrollProvider>
    <RouterProvider router={router}/>
    </ScrollProvider>
  </Provider>
);
