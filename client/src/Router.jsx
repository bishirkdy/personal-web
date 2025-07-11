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
import Layout from "./Layout";
import SpecifiedProject from "./pages/works/SpecifiedProject";
import UpdateProject from "./pages/admin/UpdateProject";
import PaymentPage from "./pages/payment/PaymentPage";
import AiPrompt from "./pages/works/ai/AiPrompt";
import Admin from "./pages/admin/Admin";
import AddAiPrompts from "./pages/admin/ai/AddAiPrompts";
import CreateProject from "./pages/admin/CreateProject";
import User from "./pages/admin/users/User";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="verify-account" element={<VerifyAccount />} />

      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route element={<Authenticate />}>
          <Route path="projects" element={<MyWork />} />
          <Route path="payment" element={<PaymentPage />} />

          <Route path="ai-prompts" element={<AiPrompt />} />
          <Route path="projects/:id" element={<SpecifiedProject />} />

          <Route path="admin" element={<Admin />}>
            <Route path="create-project" element={<CreateProject />} />
            <Route path="update-project/:_id" element={<UpdateProject />} />

            <Route path="add-ai" element={<AddAiPrompts />} />

            <Route path="users" element={<User/>} />
          </Route>
        </Route>
      </Route>
    </>
  )
);
export default router;
