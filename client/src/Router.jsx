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
import CreateProject from "./pages/admin/createProject";
import Layout from "./Layout";
import SpecifiedProject from "./pages/works/SpecifiedProject";
import UpdateProject from "./pages/admin/UpdateProject";
import Cart from "./pages/cart/Cart";
import Contact from "./components/Contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="verify-account" element={<VerifyAccount />} />

      <Route element={<Layout />}>
        <Route path="create-project" element={<CreateProject />} />
        <Route path="update-project/:_id" element={<UpdateProject/>}/>
        <Route path="/" element={<App />} />

        <Route element={<Authenticate />}>
        <Route path="projects" element={<MyWork />} />
        <Route path="projects/:id" element={<SpecifiedProject/>}/>
        {/* <Route path="cart" element={<Cart/>}/> */}
      </Route>
      </Route>    
    </>
  )
);
export default router;
