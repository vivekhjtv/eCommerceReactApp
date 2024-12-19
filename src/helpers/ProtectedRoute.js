import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/auth";

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    // Redirect to Sign-In page if user is not logged in
    return <Navigate to="/signin" replace />;
  }

  // Render the protected component if the user is logged in
  return children;
};

export default ProtectedRoute;
