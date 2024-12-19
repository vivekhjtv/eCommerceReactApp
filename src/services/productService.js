import axios from "axios";
export const getProducts = async () => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/product/get`;
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async ({ id }) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/product/get-product-details`;
  try {
    const response = await axios.post(API_URL, { productId: id });
    return response.data.data;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};
