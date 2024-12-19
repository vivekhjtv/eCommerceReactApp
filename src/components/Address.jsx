import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  addAddress,
  deleteAddress,
  getAllAddresses,
  setDefaultAddress,
} from "../services/addressService";
import { useSelector } from "react-redux";

const Address = () => {
  const storeUser = useSelector((state) => state.persistedReducer.user) || {};

  const [addresses, setAddresses] = useState([]);
  const [user, setUser] = useState({
    _id: null,
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: false,
  });
  const fetchAllAddress = async (userId) => {
    if (!userId) return;
    try {
      const response = await getAllAddresses(userId);
      setAddresses(response);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleAddAddress = async () => {
    try {
      const response = await addAddress({ user });
      if (response.success === true) {
        setUser({
          address_line: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          mobile: "",
          status: false,
        });

        // Close the modal
        const modalElement = document.getElementById("addAddressModal");
        modalElement.classList.remove("show");
        modalElement.setAttribute("aria-hidden", "true");
        modalElement.style.display = "none";
        setTimeout(() => {
          const backdrop = document.querySelector(".modal-backdrop");
          if (backdrop) {
            backdrop.parentNode.removeChild(backdrop);
          }
        }, 200);

        setTimeout(() => {
          fetchAllAddress(storeUser._id);
        }, 100);
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  const handleSetDefaultAddress = async (userId, addressId) => {
    try {
      const response = await setDefaultAddress(userId, addressId);
      if (response.success) {
        fetchAllAddress(userId);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };
  const handleDeleteAddress = async (userId, addressId) => {
    try {
      const response = await deleteAddress(userId, addressId);
      if (response.success) {
        fetchAllAddress(userId);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  useEffect(() => {
    if (storeUser && storeUser._id) {
      fetchAllAddress(storeUser._id);
    }
  }, [storeUser?._id]);

  return (
    <div className="py-6 p-md-6 p-lg-10">
      <div className="d-flex justify-content-between mb-6">
        <h2 className="mb-0">Address</h2>
        <Link
          to="#"
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#addAddressModal"
        >
          Add Link new address
        </Link>
      </div>

      <div className="row">
        {addresses.map((address, index) => (
          <div className="col-xl-5 col-lg-6 col-xxl-4 col-12 mb-4" key={index}>
            <div className="card">
              <div className="card-body p-6">
                <div className="form-check">
                  {address.status ? (
                    <>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id={`addressRadio${index}`}
                        defaultChecked={address.status === true}
                      />
                      <span className="badge bg-success">Default Address</span>
                    </>
                  ) : (
                    <>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id={`addressRadio${index}`}
                        defaultChecked={address.status === true}
                      />
                      <label
                        className="form-check-label text-dark fw-semibold"
                        htmlFor={`addressRadio${index}`}
                      >
                        {"Home"}
                      </label>
                    </>
                  )}
                </div>

                <p className="mb-6">
                  {address.name}
                  <br />
                  {address.address_line},
                  <br />
                  {address.city}, {address.state}, {address.country},
                  <br />
                  {address.mobile}
                </p>

                <div className="mt-4">
                  {address.status ? (
                    <></>
                  ) : (
                    <Link
                      to="#"
                      className="btn btn-info btn-sm me-2"
                      onClick={() =>
                        handleSetDefaultAddress(storeUser._id, address._id)
                      }
                    >
                      Set as Default
                    </Link>
                  )}
                  <Link
                    to="#"
                    className="btn btn-danger btn-sm "
                    onClick={() =>
                      handleDeleteAddress(storeUser._id, address._id)
                    }
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="addAddressModal"
        tabIndex="-1"
        aria-labelledby="addAddressModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-6">
              <div className="d-flex justify-content-between mb-5">
                <div>
                  <h5 className="mb-1" id="addAddressModalLabel">
                    New Shipping Address
                  </h5>
                  <p className="small mb-0">
                    Add new shipping address for your order delivery.
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address Line"
                    name="address_line"
                    onChange={handleChange}
                    value={user.address_line || ""}
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    onChange={handleChange}
                    value={user.city || ""}
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    name="state"
                    onChange={handleChange}
                    value={user.state || ""}
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pincode"
                    name="pincode"
                    onChange={handleChange}
                    value={user.pincode || ""}
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Country"
                    name="country"
                    onChange={handleChange}
                    value={user.country || ""}
                  />
                </div>

                <div className="col-12">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Mobile"
                    name="mobile"
                    onChange={handleChange}
                    value={user.mobile || ""}
                  />
                </div>

                {/* <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="status"
                      name="status"
                      onChange={handleChange}
                      checked={user.status || false}
                    />
                    <label className="form-check-label" htmlFor="status">
                      Is Active
                    </label>
                  </div>
                </div> */}

                <div className="col-12 text-end">
                  <button
                    type="button"
                    className="btn btn-outline-primary mx-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddAddress}
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
