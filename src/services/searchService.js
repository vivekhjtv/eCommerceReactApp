import axios from "axios";

export const searchProduct = async ({ search, page, limit }) => {
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/product/search-product`;
  try {
    const response = await axios.post(API_URL, {
      search,
      page,
      limit,
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching products:", error);
    return { data: [], totalCount: 0, totalPage: 0 };
  }
};
