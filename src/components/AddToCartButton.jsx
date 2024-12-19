import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../services/cartService";
import { useFetchCartItems } from "../helpers/getCartItem";
import { toast } from "react-toastify";
import UpdateQuantityButton from "./UpdateQuantityButton";

const AddToCartButton = ({ productId }) => {
  const { fetchCartItems } = useFetchCartItems();
  const [isAvailable, setIsAvailable] = useState(false);
  const user = useSelector((state) => state.persistedReducer.user);
  const cartItems = useSelector((state) => state.persistedReducer.cart.cart);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await addToCart(productId, user._id);
      if (response.status === 400) {
        toast(
          response.data.message || "Something went wrong. Please try again."
        );
      } else if (response.success) {
        if (fetchCartItems) {
          fetchCartItems();
        }
        toast("Item added to cart successfully!");
      } else {
        toast("Item already in cart");
      }
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const flatCartItems = cartItems[0];
    const checkItemInCart = flatCartItems?.some(
      (item) => item?.productId?._id === productId
    );
    setIsAvailable(checkItemInCart);
  }, [productId, cartItems]);
  return (
    <>
      {isAvailable ? (
        <UpdateQuantityButton productId={productId} />
      ) : (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </>
  );
};

export default AddToCartButton;
