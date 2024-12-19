import axios from "axios";
export const addAddress = async ({ user }) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/address/create`;
  try {
    const response = await axios.post(API_URL, user, {
      withCredentials: true,
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in addAddress:", error);
    throw error;
  }
};
export const getAllAddresses = async (userId) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/address/get?userId=${userId}`;
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

// export const updateAddress = async (userId, addressData) => {
//   const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/address/update?userId=${userId}`;

//   try {
//     // Using the PUT method to send the updated address data
//     const response = await axios.put(API_URL, addressData);
//     return response.data;  // Return the response with the updated address data
//   } catch (error) {
//     console.error("Error updating address:", error);
//     throw error;  // Propagate the error to be handled by the calling code
//   }
// };
export const setDefaultAddress = async (userId, addressId) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/address/setDefault`;
  try {
    const response = await axios.post(API_URL, {
      userId,
      addressId: addressId,
    });
    return response.data;
  } catch (error) {
    console.error("Error setting default address:", error);
    throw error;
  }
};
export const deleteAddress = async (userId, addressId) => {
  console.log(addressId);
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/address/disable`;

  try {
    const response = await axios.delete(API_URL, {
      data: { userId, _id: addressId },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};
