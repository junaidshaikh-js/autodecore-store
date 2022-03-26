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

export const loginAsGuest = async (
  dispatch,
  email,
  password,
  setIsLoading,
  navigate
) => {
  setIsLoading(true);
  try {
    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });

    if (res.status == 200 || res.status == 201) {
      dispatch({ type: "LOGIN", payload: res.data });
    }

    localStorage.setItem("token", res.data.encodedToken);
    localStorage.setItem("userName", res.data.foundUser.firstName);

    setIsLoading(false);
    navigate("/");
  } catch (error) {
    setIsLoading(false);
    console.log(error.response);
    throw new Error("can not be logged in");
  }
};
