import React, { useEffect, useState } from "react";
import { deleteQuantityFormDB } from "../services/cartService";
import { useSelector } from "react-redux";
import { useFetchCartItems } from "../helpers/getCartItem";

const UpdateQuantityButton = ({ productId }) => {
  const { fetchCartItems, updateQuantity } = useFetchCartItems();
  const [quantity, setQuantity] = useState(1);

  const user = useSelector((state) => state.persistedReducer.user);
  const cartItems = useSelector((state) => state.persistedReducer.cart.cart);

  const handleIncreaseQuantity = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await updateQuantity(productId, quantity + 1);
      fetchCartItems();
      setQuantity(quantity + 1);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (quantity === 1) {
        const response = await deleteQuantityFormDB(user?._id, productId);
        console.log(response);
        setQuantity(0);
        fetchCartItems();
      } else {
        const response = await updateQuantity(productId, quantity - 1);
        setQuantity(quantity - 1);
        fetchCartItems();
      }
    } catch (error) {
      console.error("Error handling quantity change:", error);
    }
  };

  useEffect(() => {
    const flatCartItems = cartItems[0];
    const productInCart = flatCartItems?.find(
      (item) => item?.productId?._id === productId
    );
    const productQuantity = productInCart ? productInCart.quantity : 0;
    setQuantity(productQuantity);
  }, [productId, cartItems]);
  return (
    <div
      style={{
        display: "inline-block",
      }}
    >
      <div className="d-flex ms-2">
        <button
          className="btn btn-primary btn-sm px-3"
          onClick={handleDecreaseQuantity}
          disabled={quantity <= 0}
        >
          -
        </button>
        <input
          type="text"
          id="quantity"
          className="form-control text-center mx-2"
          value={quantity}
          style={{
            width: "40px",
            height: "30px",
            fontSize: "14px",
            padding: "0",
          }}
          readOnly
        />
        <button
          className="btn btn-primary btn-sm px-3"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default UpdateQuantityButton;
