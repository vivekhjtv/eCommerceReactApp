import React, { useState } from "react";
import { IMAGE_PREFIX } from "../helpers/constant";
import { addUserToDB } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [checkPass, setCheckPass] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleCheckPassword = () => {
    setCheckPass((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addUserToDB(user);
      if (response.success) {
        toast.success(response?.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setUser({
          name: "",
          email: "",
          password: "",
        });
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });


    }
  };

  return (
    <>
      <main>
        <section className="my-lg-14 my-8">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                <img
                  src={`${IMAGE_PREFIX}/svg-graphics/signup-g.svg`}
                  alt=""
                  className="img-fluid"
                />
              </div>

              <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                <div className="mb-lg-9 mb-5">
                  <h1 className="mb-1 h2 fw-bold">Get Start Shopping</h1>
                  <p>Welcome to FreshCart! Enter your email to get started.</p>
                </div>

                <form
                  className="needs-validation"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="row g-3">
                    <div className="col-12">
                      <label
                        htmlFor="formSignupName"
                        className="form-label visually-hidden"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="formSignupName"
                        placeholder="Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your name.
                      </div>
                    </div>
                    <div className="col-12">
                      <label
                        htmlFor="formSignupEmail"
                        className="form-label visually-hidden"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="formSignupEmail"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter email.
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="password-field position-relative">
                        <label
                          htmlFor="formSignupPassword"
                          className="form-label visually-hidden"
                        >
                          Password
                        </label>
                        <div className="password-field position-relative">
                          <input
                            type={checkPass ? "text" : "password"}
                            className="form-control fakePassword"
                            id="formSignupPassword"
                            placeholder="*****"
                            name="password"
                            onChange={handleChange}
                            value={user.password}
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
                        Register
                      </button>
                    </div>

                    <p>
                      <small>
                        By continuing, you agree to our
                        <a href="#!">Terms of Service</a>&
                        <a href="#!">Privacy Policy</a>
                      </small>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SignUp;
