import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import App from "./App";
import Register from "./components/Register";
import Authenticate from "./components/Authenticate";
import MyWork from "./pages/works/MyWork";
import VerifyAccount from "./components/VerifyAccount";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<App />} />
      <Route path="verify-account" element={<VerifyAccount />} />
      <Route element={<Authenticate />}>
        <Route path="projects" element={<MyWork />} />
      </Route>
    </>
  )
);
export default router;
