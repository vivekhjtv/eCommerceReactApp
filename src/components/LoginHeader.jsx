import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_PREFIX } from "../helpers/constant";

const LoginHeader = () => {
  return (
    <>
      <div className="border-bottom shadow-sm">
        <nav className="navbar navbar-light py-2">
          <div className="container justify-content-center justify-content-lg-between">
            <Link className="navbar-brand" to="/">
              <img
                src={`${IMAGE_PREFIX}/logo/freshcart-logo.svg`}
                alt=""
                className="d-inline-block align-text-top"
              />
            </Link>
            <span className="navbar-text">
              Already have an account?
              <Link className="navbar-text-link" to="/signin">
                Sign in
              </Link>
            </span>
          </div>
        </nav>
      </div>
    </>
  );
};

export default LoginHeader;
