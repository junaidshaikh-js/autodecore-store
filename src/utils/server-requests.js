import axios from "axios";

export const getProducts = async (dispatch) => {
  try {
    const res = await axios.get("/api/products");

    if (res.status == 200 || res.status == 201) {
      dispatch({ type: "SET_PRODUCTS", payload: res.data.products });
    }
  } catch (error) {
    throw new Error("Products can not be loaded");
  }
};

export const getCategories = async (dispatch) => {
  try {
    const res = await axios.get("/api/categories");

    if (res.status == 200 || res.status == 201) {
      dispatch({ type: "SET_CATEGORIES", payload: res.data.categories });
    }
  } catch (err) {
    throw new Error("Categories can not be loaded,", err);
  }
};
