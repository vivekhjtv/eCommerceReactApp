// hooks/useFetchCartItems.js
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, updateQuantityFormBD } from "../services/cartService";
import { addItemsToCart } from "../store/cartSlice";

export const useFetchCartItems = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.persistedReducer.user);

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!user._id) return;
    try {
      const response = await getCartItems(user._id);
      if (response.success) {
        dispatch(addItemsToCart(response.data));
      } else {
        console.log("Failed to fetch cart items.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Update quantity
  const updateQuantity = async (_id, qty) => {
    try {
      const response = await updateQuantityFormBD(user._id, _id, qty);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchCartItems, updateQuantity };
};
