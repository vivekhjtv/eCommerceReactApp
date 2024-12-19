import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addToWishList } from "../services/cartService";
import { toast } from "react-toastify";

const WishlistButton = ({ productId }) => {
  const user = useSelector((state) => state.persistedReducer.user);
  const handleAddToWishList = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await addToWishList(productId, user._id);

      if (response.status === 400) {
        toast(
          response.data.message || "Something went wrong. Please try again."
        );
      } else if (response.success) {
        toast("Item added to Wishlist successfully!");
      } else {
        toast("Item already in Wishlist");
      }
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleAddToWishList}
      className="btn btn-sm btn-outline-secondary ms-2"
    >
      Add to Wishlist
    </button>
  );
};

export default WishlistButton;
