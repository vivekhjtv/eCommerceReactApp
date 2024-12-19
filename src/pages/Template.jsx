import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLoggedIn } from "../helpers/auth";
const Template = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/signin";

  // useEffect(() => {
  //   if (!isLoggedIn() && !isAuthPage) {
  //     // If not logged in and trying to access a non-auth page ---- redirect to signin
  //     navigate("/signin");
  //   } else if (isLoggedIn() && isAuthPage) {
  //     // If logged in and trying to access signin or signup ---- redirect to home or dashboard
  //     navigate("/");
  //   }
  // }, [navigate, location.pathname, isAuthPage]);

  return (
    <>
      {isAuthPage ? <LoginHeader /> : <Header />}
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
};

export default Template;
