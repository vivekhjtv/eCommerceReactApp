import axios from "axios";

// add user
export const addUserToDB = async (userData) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/register`;
  try {
    const response = await axios.post(API_URL, userData, {
      withCredentials: true,
    });
    // console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in addUserToDB:", error);
    throw error;
  }
};

// login user
export const login = async (userData) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/login`;
  try {
    const response = await axios.post(API_URL, userData, {
      withCredentials: true,
    });
    // console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in addUserToDB:", error);
    throw error;
  }
};
// logout user
export const logoutUser = async () => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/logout`;
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error in addUserToDB:", error);
    throw error;
  }
};
