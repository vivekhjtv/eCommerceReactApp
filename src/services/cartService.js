import axios from "axios";

export const addToCart = async (productId, userId) => {
  console.log(productId, userId);
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/cart/create`;

  try {
    const response = await axios.post(API_URL, {
      productId: productId,
      userId: userId,
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching products:", error);
    return { success: false, message: "Error adding item to cart" };
  }
};

export const getCartItems = async (userId) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/cart/get`;

  try {
    const response = await axios.post(API_URL, {
      userId: userId,
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching cart items:", error);
    return { data: [], success: false, message: "Error fetching cart items" };
  }
};

export const updateQuantityFormBD = async (userId, _id, qty) => {
  // console.log(userId, _id, qty);
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/cart/update-qty`;

  try {
    const response = await axios.put(API_URL, {
      userId: userId,
      _id: _id,
      qty: qty,
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching cart items:", error);
    return { data: [], success: false, message: "Error fetching cart items" };
  }
};

export const deleteQuantityFormDB = async (userId, _id) => {
  console.log(userId, _id);
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/cart/delete-cart-item`;

  try {
    const response = await axios.delete(API_URL, {
      data: { userId, _id }, // sending the data in the 'data' field
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching cart items:", error);
    return { data: [], success: false, message: "Error fetching cart items" };
  }
};

// Add to wishlist Item
export const addToWishList = async (productId, userId) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/wishlist/add`;
  try {
    const response = await axios.post(API_URL, {
      productId: productId,
      userId: userId,
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching products:", error);
    return { success: false, message: "Error adding item to cart" };
  }
};

export const getWishlistItems = async (userId) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/wishlist/get`;
  try {
    const response = await axios.post(API_URL, {
      userId: userId,
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching cart items:", error);
    return { data: [], success: false, message: "Error fetching cart items" };
  }
};

export const deleteWishlistItemFormDB = async (userId, _id) => {
  console.log(userId, _id);
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/wishlist/delete`;

  try {
    const response = await axios.delete(API_URL, {
      data: { userId, _id },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching cart items:", error);
    return { data: [], success: false, message: "Error fetching cart items" };
  }
};
