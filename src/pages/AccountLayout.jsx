import React from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { setLogout } from "../store/userSlice";
import { logoutUser } from "../services/userService";

const AccountLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      if (response.success === true) {
        localStorage.removeItem("token");
        dispatch(setLogout());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <section>
        <div className="container">
          <div className="row">
            {/* Left bar */}
            <div className="col-lg-3 col-md-4 col-12 border-end d-none d-md-block">
              <div className="pt-10 pe-lg-10">
                <ul className="nav flex-column nav-pills nav-pills-dark">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/account/orders" ? "active" : ""
                      }`}
                      aria-current="page"
                      to="/account/orders"
                    >
                      <i className="feather-icon icon-shopping-bag me-2"></i>
                      Your Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/account/settings"
                          ? "active"
                          : ""
                      }`}
                      to="/account/settings"
                    >
                      <i className="feather-icon icon-settings me-2"></i>
                      Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/account/address" ? "active" : ""
                      }`}
                      to="/account/address"
                    >
                      <i className="feather-icon icon-map-pin me-2"></i>
                      Address
                    </Link>
                  </li>
                  <li className="nav-item">
                    <hr />
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link p-0 text-start"
                      onClick={handleLogout}
                    >
                      <i className="feather-icon icon-log-out me-2"></i>
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AccountLayout;
