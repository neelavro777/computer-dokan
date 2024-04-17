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
import ChatPage from "./pages/ChatPage";
import CompareProductPage from "./pages/CompareProductPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PCbuilderPage from "./pages/PCbuilderPage";
import CategoryPage from "./pages/CategoryPage";
import PaymentFailurePage from "./pages/PaymentFailurePage";
import CustomerPage from "./pages/CustomerPage";
import "./index.css";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";

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
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
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
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/payment/success/:transactionId",
    element: <PaymentSuccessPage />,
  },
  {
    path: "/payment/fail/:transactionId",
    element: <PaymentFailurePage />,
  },
  {
    path: "/compare",
    element: <CompareProductPage />,
  },
  {
    path: "/pc-builder",
    element: <PCbuilderPage />,
  },
  {
    path: "/category/:category",
    element: <CategoryPage />,
  },
  {
    path: "/customer",
    element: <CustomerPage />,
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
