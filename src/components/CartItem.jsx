import React, { useState } from "react";
import { deleteQuantityFormDB } from "../services/cartService";
import { useDispatch, useSelector } from "react-redux";
import UpdateQuantityButton from "./UpdateQuantityButton";
import { removeFromCart } from "../store/cartSlice";

const CartItem = ({ cartItem }) => {
  const user = useSelector((state) => state.persistedReducer.user);
  const dispatch = useDispatch();

  const deleteCartItem = async () => {
    try {
      // Call API to delete from the database
      await deleteQuantityFormDB(user?._id, cartItem.productId._id);

      // Remove item from Redux store
      dispatch(removeFromCart(cartItem.productId._id));
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  return (
    <li key={cartItem._id} className="list-group-item py-3 ps-0 border-top">
      <div className="row g-3 align-items-center">
        {/* Product Details */}
        <div className="col-12 col-md-6 d-flex">
          <img
            src={cartItem.productId?.image[0]}
            alt={cartItem.productId?.name}
            className="icon-shape icon-xxl"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
          <div className="ms-3">
            <h6 className="mb-0">{cartItem.productId.name}</h6>
            <small className="text-muted">
              ${cartItem.productId.price.toFixed(2)}
            </small>
            <div className="mt-2 small lh-1">
              <button
                className="btn btn-link text-decoration-none text-inherit p-0"
                onClick={deleteCartItem}
              >
                <span className="me-1 align-text-bottom">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-trash-2 text-success"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </span>
                <span className="text-muted">Remove</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="col-6 col-md-3 text-start">
          <div className="input-group input-spinner">
            <UpdateQuantityButton productId={cartItem.productId._id} />
          </div>
        </div>

        {/* Price */}
        <div className="col-6 col-md-3 text-end">
          <span className="fw-bold">
            ${(cartItem.productId.price * cartItem.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
