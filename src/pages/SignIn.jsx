import React, { useState } from "react";
import { IMAGE_PREFIX } from "../helpers/constant";
import { login } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/userSlice";

const SignIn = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [checkPass, setCheckPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckPassword = () => {
    setCheckPass((prev) => !prev);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(userData);
    dispatch(setToken(response?.data?.accesstoken));
    dispatch(setUser(response?.data?.updateUser));

    if (response.success) {
      localStorage.setItem("token", response?.data?.accesstoken);
      toast(response?.message);
      setUserData({
        email: "",
        password: "",
      });
      navigate("/");
    }
    try {
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <main>
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
              <img
                src={`${IMAGE_PREFIX}/svg-graphics/signin-g.svg`}
                alt=""
                className="img-fluid"
              />
            </div>

            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
              <div className="mb-lg-9 mb-5">
                <h1 className="mb-1 h2 fw-bold">Sign in to FreshCart</h1>
                <p>
                  Welcome back to FreshCart! Enter your email to get started.
                </p>
              </div>

              <form
                className="needs-validation"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="row g-3">
                  <div className="col-12">
                    <label
                      htmlFor="formSigninEmail"
                      className="form-label visually-hidden"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="formSigninEmail"
                      placeholder="Email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter name.</div>
                  </div>
                  <div className="col-12">
                    <div className="password-field position-relative">
                      <label
                        htmlFor="formSigninPassword"
                        className="form-label visually-hidden"
                      >
                        Password
                      </label>
                      <div className="password-field position-relative">
                        <input
                          type={checkPass ? "text" : "password"}
                          className="form-control fakePassword"
                          id="formSigninPassword"
                          placeholder="*****"
                          name="password"
                          value={userData.password}
                          onChange={handleChange}
                          required
                        />
                        <span
                          onClick={handleCheckPassword}
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className={`bi ${
                              checkPass ? "bi-eye" : "bi-eye-slash"
                            }`}
                          ></i>
                        </span>
                        <div className="invalid-feedback">
                          Please enter password.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 d-grid">
                    <button type="submit" className="btn btn-primary">
                      Sign In
                    </button>
                  </div>

                  <div>
                    Don’t have an account?
                    <a href="/signup" className="navbar-text-link">
                      Sign Up
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
