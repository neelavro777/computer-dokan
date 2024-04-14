import "./App.css";
// import AuthenticationPage from "./pages/AuthenticationPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";
import VerifyUser from "./pages/VerifyUserPage";
import AdminPage from "./pages/AdminPage";
import SellerPage from "./pages/SellerPage";
import ProductPage from "./pages/ProductPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/verify-user/:token",
    element: <VerifyUser />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/seller",
    element: <SellerPage />,
  },
  {
    path: "/view-product/:id",
    element: <ProductPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
