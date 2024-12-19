import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import HomePage from "../pages/HomePage";
import SingleProductPage from "../pages/SingleProductPage";
import ShopGridColumn from "../pages/ShopGridColumn";
import StoreGrid from "../pages/StoreGrid";
import Blog from "../pages/Blog";
import AccountLayout from "../pages/AccountLayout";
import Orders from "../components/Orders";
import Settings from "../components/Settings";
import Address from "../components/Address";
import ShopCart from "../pages/ShopCart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import ProtectedRoute from "../helpers/ProtectedRoute";
import SearchResults from "../pages/SearchResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "single-product-page/:id",
        element: <SingleProductPage />,
      },
      {
        path: "store-grid",
        element: <StoreGrid />,
      },
      {
        path: "shop-grid-column",
        element: <ShopGridColumn />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "search",
        element: <SearchResults />,
      },
      {
        path: "account",
        element: <AccountLayout />,
        children: [
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "address",
            element: <Address />,
          },
        ],
      },
      // {
      //   path: "cart",
      //   element: <ShopCart />,
      // },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <ShopCart />,
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "success",
        element: <OrderSuccessPage />,
      },
    ],
  },
]);

export default router;
