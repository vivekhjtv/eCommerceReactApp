import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

import { useSelector } from "react-redux";
import { useFetchCartItems } from "../helpers/getCartItem";
import { getWishlistItems } from "../services/cartService";
import { toast } from "react-toastify";

const Header = () => {
  const [searchItems, setSearchItems] = useState("");

  const [quantity, setQuantity] = useState("0");
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.persistedReducer.cart.cart);
  const user = useSelector((state) => state.persistedReducer.user);
  // fetch cart items
  const { fetchCartItems } = useFetchCartItems();
  const handleSearch = (event) => {
    setSearchItems(event.target.value);
    debouncedFetchUsers(event.target.value);
  };

  const fetchSearchResults = async (term) => {
    try {
      navigate(`/search?query=${term}`);
    } catch (error) {
      console.log("Error fetching search results:", error);
    } finally {
      // setLoading(false);
    }
  };
  const debouncedFetchUsers = useCallback(
    debounce((term) => fetchSearchResults(term), 300),
    []
  );
  const fetchWishlist = async () => {
    try {
      const response = await getWishlistItems(user._id);
      if (response?.success) {
        setWishlist(response.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("An error occurred while fetching wishlist");
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, []);
  useEffect(() => {
    const totalQuantity = cartItems[0]?.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    setQuantity(totalQuantity);
  }, []);

  return (
    <>
      <div className="border-bottom">
        <div className="bg-light py-1">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12 text-center text-md-start">
                <span>Super Value Deals - Save more with coupons</span>
              </div>
              <div className="col-6 text-end d-none d-md-block">
                <div className="dropdown selectBox">
                  <Link
                    className="dropdown-toggle selectValue text-reset"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="me-2">
                      <svg
                        width="16"
                        height="13"
                        viewBox="0 0 16 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#selectedlang)">
                          <path d="M0 0.5H16V12.5H0V0.5Z" fill="#012169" />
                          <path
                            d="M1.875 0.5L7.975 5.025L14.05 0.5H16V2.05L10 6.525L16 10.975V12.5H14L8 8.025L2.025 12.5H0V11L5.975 6.55L0 2.1V0.5H1.875Z"
                            fill="white"
                          />
                          <path
                            d="M10.6 7.525L16 11.5V12.5L9.225 7.525H10.6ZM6 8.025L6.15 8.9L1.35 12.5H0L6 8.025ZM16 0.5V0.575L9.775 5.275L9.825 4.175L14.75 0.5H16ZM0 0.5L5.975 4.9H4.475L0 1.55V0.5Z"
                            fill="#C8102E"
                          />
                          <path
                            d="M6.025 0.5V12.5H10.025V0.5H6.025ZM0 4.5V8.5H16V4.5H0Z"
                            fill="white"
                          />
                          <path
                            d="M0 5.325V7.725H16V5.325H0ZM6.825 0.5V12.5H9.225V0.5H6.825Z"
                            fill="#C8102E"
                          />
                        </g>
                        <defs>
                          <clipPath id="selectedlang">
                            <rect
                              width="16"
                              height="12"
                              fill="white"
                              transform="translate(0 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    English
                  </Link>

                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="#">
                        <span className="me-2">
                          <svg
                            width="16"
                            height="13"
                            viewBox="0 0 16 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#selectedlang)">
                              <path d="M0 0.5H16V12.5H0V0.5Z" fill="#012169" />
                              <path
                                d="M1.875 0.5L7.975 5.025L14.05 0.5H16V2.05L10 6.525L16 10.975V12.5H14L8 8.025L2.025 12.5H0V11L5.975 6.55L0 2.1V0.5H1.875Z"
                                fill="white"
                              />
                              <path
                                d="M10.6 7.525L16 11.5V12.5L9.225 7.525H10.6ZM6 8.025L6.15 8.9L1.35 12.5H0L6 8.025ZM16 0.5V0.575L9.775 5.275L9.825 4.175L14.75 0.5H16ZM0 0.5L5.975 4.9H4.475L0 1.55V0.5Z"
                                fill="#C8102E"
                              />
                              <path
                                d="M6.025 0.5V12.5H10.025V0.5H6.025ZM0 4.5V8.5H16V4.5H0Z"
                                fill="white"
                              />
                              <path
                                d="M0 5.325V7.725H16V5.325H0ZM6.825 0.5V12.5H9.225V0.5H6.825Z"
                                fill="#C8102E"
                              />
                            </g>
                            <defs>
                              <clipPath id="selectedlang">
                                <rect
                                  width="16"
                                  height="12"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        English
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        <span className="me-2">
                          <svg
                            width="16"
                            height="13"
                            viewBox="0 0 16 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_5543_19751)">
                              <path d="M0 8.5H16V12.5H0V8.5Z" fill="#FFCE00" />
                              <path d="M0 0.5H16V4.5H0V0.5Z" fill="black" />
                              <path d="M0 4.5H16V8.5H0V4.5Z" fill="#DD0000" />
                            </g>
                            <defs>
                              <clipPath id="clip0_5543_19751">
                                <rect
                                  width="16"
                                  height="12"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        Deutsch
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="container">
            <div className="row w-100 align-items-center gx-lg-2 gx-0">
              <div className="col-xxl-2 col-lg-3 col-md-6 col-5">
                <Link className="navbar-brand d-none d-lg-block" to="/">
                  <img
                    src="../assets/images/logo/freshcart-logo.svg"
                    alt="eCommerce HTML Template"
                  />
                </Link>
                <div className="d-flex justify-content-between w-100 d-lg-none">
                  <Link className="navbar-brand" to="/">
                    <img
                      src="../assets/images/logo/freshcart-logo.svg"
                      alt="eCommerce HTML Template"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xxl-5 col-lg-5 d-none d-lg-block">
                <form action="#">
                  <div className="input-group">
                    <input
                      className="form-control rounded"
                      type="search"
                      placeholder="Search for products"
                      name="search"
                      value={searchItems}
                      onChange={handleSearch} // Use the handleSearch function
                    />
                    <span className="input-group-append">
                      <button
                        className="btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end"
                        type="button"
                        onClick={() => debouncedFetchUsers(searchItems)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-search"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                    </span>
                  </div>
                </form>
              </div>
              <div className="col-md-2 col-xxl-3 d-none d-lg-block">
                <button
                  type="button"
                  className="btn btn-outline-gray-400 text-muted"
                  data-bs-toggle="modal"
                  data-bs-target="#locationModal"
                >
                  <i className="feather-icon icon-map-pin me-2"></i>
                  Location
                </button>
              </div>
              <div className="col-lg-2 col-xxl-2 text-end col-md-6 col-7">
                <div className="list-inline">
                  <div className="list-inline-item me-5">
                    <Link
                      to="/wishlist"
                      className="text-muted position-relative"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-heart"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        {wishlist.length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </div>
                  <div className="list-inline-item me-5">
                    <Link to="/account/settings" className="text-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </Link>
                  </div>
                  <div className="list-inline-item me-5 me-lg-0">
                    <Link
                      className="text-muted position-relative"
                      to="/cart"
                      role="button"
                      aria-controls="offcanvasRight"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-shopping-bag"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        {quantity}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </div>
                  <div className="list-inline-item d-inline-block d-lg-none">
                    <button
                      className="navbar-toggler collapsed"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#navbar-default"
                      aria-controls="navbar-default"
                      aria-label="Toggle navigation"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-text-indent-left text-primary"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav
          className="navbar navbar-expand-lg navbar-light navbar-default py-0 pb-lg-4"
          aria-label="Offcanvas navbar large"
        >
          <div className="container">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="navbar-default"
              aria-labelledby="navbar-defaultLabel"
            >
              <div className="offcanvas-header pb-1">
                <Link to="index.html">
                  <img
                    src="../assets/images/logo/freshcart-logo.svg"
                    alt="eCommerce HTML Template"
                  />
                </Link>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className="d-block d-lg-none mb-4">
                  <form action="#">
                    <div className="input-group">
                      <input
                        className="form-control rounded"
                        type="search"
                        placeholder="Search for products"
                      />
                      <span className="input-group-append">
                        <button
                          className="btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-search"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </button>
                      </span>
                    </div>
                  </form>
                  <div className="mt-2">
                    <button
                      type="button"
                      className="btn btn-outline-gray-400 text-muted w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#locationModal"
                    >
                      <i className="feather-icon icon-map-pin me-2"></i>
                      Pick Location
                    </button>
                  </div>
                </div>
                <div className="d-block d-lg-none mb-4">
                  <Link
                    className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                    role="button"
                    // aria-expanded="false"
                    // aria-controls="collapseExample"
                  >
                    <span className="me-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-grid"
                      >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                    </span>
                    All Departments
                  </Link>
                </div>
                <div className="dropdown me-3 d-none d-lg-block">
                  <button
                    className="btn btn-primary px-6"
                    type="button"
                    aria-expanded="false"
                  >
                    <span className="me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-grid"
                      >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                    </span>
                    All Departments
                  </button>
                  {/* <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item" to="shop-grid.html">
                        Dairy, Bread & Eggs
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="shop-grid.html">
                        Snacks & Munchies
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="shop-grid.html">
                        Fruits & Vegetables
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="shop-grid.html">
                        Cold Drinks & Juices
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="shop-grid.html">
                        Breakfast & Instant Food
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="shop-grid.html">
                        Bakery & Biscuits
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="shop-grid.html">
                        Chicken, Meat & Fish
                      </Link>
                    </li>
                  </ul> */}
                </div>
                <div>
                  <ul className="navbar-nav align-items-center">
                    <li className="nav-item dropdown w-100 w-lg-auto">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Home
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/">
                            Home 1
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown w-100 w-lg-auto">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Shop
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/shop-grid-column"
                          >
                            Shop Grid - Filter
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/shop-grid-column"
                          >
                            Shop Grid - 3 column
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/shop-grid-column"
                          >
                            Shop List - Filter
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/shop-grid-column"
                          >
                            Shop - Filter
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/shop-grid-column"
                          >
                            Shop Wide
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/shop-grid-column"
                          >
                            Shop Single
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/shop-grid-column"
                          >
                            Shop Single v2
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/shop-grid-column"
                          >
                            Shop Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/shop-grid-column"
                          >
                            Shop Cart
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/shop-grid-column"
                          >
                            Shop Checkout
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown w-100 w-lg-auto">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Stores
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/store-grid">
                            Store List
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/store-grid">
                            Store Grid
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/store-grid">
                            Store Single
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown w-100 w-lg-auto">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Pages
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/">
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/">
                            Blog Single
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/">
                            Blog Category
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/">
                            About us
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/">
                            404 Error
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/">
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown w-100 w-lg-auto">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Account
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/signin">
                            Sign in
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/signup">
                            Signup
                          </Link>
                        </li>

                        <li className="dropdown-submenu dropend">
                          <Link
                            className="dropdown-item dropdown-list-group-item dropdown-toggle"
                            to="#"
                          >
                            My Account
                          </Link>
                          <ul className="dropdown-menu">
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/account/orders"
                              >
                                Orders
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/account/settings"
                              >
                                Settings
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/account/address"
                              >
                                Address
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
