import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemsToCart: (state, action) => {
      state.cart = [action.payload];
    },
    removeFromCart: (state, action) => {
      console.log(action.payload);

      state.cart = state.cart.filter(
        (item) => item.productId._id !== action.payload
      );
    },
  },
});
export const { addItemsToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
