import axios from "axios";
export const getAllSubCategories = async () => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/subcategory/get`;
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
