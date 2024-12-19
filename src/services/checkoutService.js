// services/checkoutService.js
import axios from "axios";

export const paymentToStripe = async ({ lineItems, domain, userId }) => {
  console.log(lineItems, domain, userId);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/order/stripe`,
      { lineItems, domain, userId }
    );

    return response;
  } catch (error) {
    console.error("Error during payment process", error);
    throw error;
  }
};

export const getOrderDetails = async (paymentId) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/order/success?paymentId=${paymentId}`;
  try {
    const response = await axios.get(API_URL);
    return response.data.order;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const getAllOrder = async (userId) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/order/allOrders?userId=${userId}`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};
