import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteWishlistItemFormDB,
  getWishlistItems,
} from "../services/cartService";
import AddToCartButton from "../components/AddToCartButton";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.persistedReducer.user);

  // Fetch wishlist from database
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
  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await deleteWishlistItemFormDB(user._id, itemId);
      fetchWishlist();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  return (
    <main>
      {/* Breadcrumb */}
      <div className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                    <span className="mx-3"> / </span>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/shop">Shop</Link>
                    <span className="mx-3"> / </span>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    My Wishlist
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Table */}
      <section className="mt-8 mb-14">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-8">
                <h1 className="mb-1">My Wishlist</h1>
                <p>
                  {wishlist.length > 0
                    ? `There are ${wishlist.length} products in your wishlist.`
                    : "No products in your wishlist."}
                </p>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table text-nowrap table-with-checkbox">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.length > 0 ? (
                        wishlist.map((item, index) => (
                          <tr key={item._id}>
                            <td className="align-middle">{index + 1}</td>
                            <td className="align-middle">
                              <Link to={`/product/${item.productId._id}`}>
                                <img
                                  src={
                                    item.productId.image[0] ||
                                    "/images/placeholder.png"
                                  }
                                  className="icon-shape icon-xxl"
                                  alt={item.productId.name}
                                />
                              </Link>
                            </td>
                            <td className="align-middle">
                              <div>
                                <h5 className="fs-6 mb-0">
                                  <Link
                                    to={`/product/${item.productId._id}`}
                                    className="text-inherit"
                                  >
                                    {item.productId.name}
                                  </Link>
                                </h5>
                                <small>
                                  {item.productId.description || "No details"}
                                </small>
                              </div>
                            </td>
                            <td className="align-middle">
                              ${item.productId.price}
                            </td>
                            <td className="align-middle">
                              <span
                                className={`badge ${
                                  item.productId.stock > 0
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {item.productId.stock > 0
                                  ? "In Stock"
                                  : "Out of Stock"}
                              </span>
                            </td>
                            <td className="align-middle">
                              {item.productId.stock > 0 ? (
                                <AddToCartButton
                                  productId={item.productId._id}
                                />
                              ) : (
                                <button
                                  className="btn btn-dark btn-sm"
                                  disabled
                                >
                                  Contact us
                                </button>
                              )}
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleRemoveFromWishlist(item._id)
                                }
                              >
                                <i className="feather-icon icon-trash-2"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No products in your wishlist.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Wishlist;
