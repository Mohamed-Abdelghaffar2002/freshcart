import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import UserContextProvider, { UserContext } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { CartContextProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut";
import AllOrders from "./components/AllOrders/AllOrders";
import { Query } from "./../node_modules/@tanstack/query-core/src/query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductByBrad from "./components/ProductByBrad/ProductByBrad";
import ProductByCategoerie from "./components/ProductByCategory/ProductByCategory";
import ProductByCategory from "./components/ProductByCategory/ProductByCategory";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import VerifyResetCode from "./components/VerifyResetCode/VerifyResetCode";
import { WishlistContextProvider } from "./context/WishlistContext";
import Wishlist from "./components/Wishlist/Wishlist";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "verifycode", element: <VerifyResetCode /> },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "brand/:id",
        element: (
          <ProtectedRoute>
            <ProductByBrad />
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:id",
        element: (
          <ProtectedRoute>
            <ProductByCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
const query = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={routers}></RouterProvider>
              <Toaster />
            </WishlistContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
