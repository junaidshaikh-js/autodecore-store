import axios from "axios";

import { isInList } from "./helper-function";

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

export const getWishList = async (dispatch, token) => {
  const wishlist = JSON.parse(localStorage.getItem("data")).wishlist;

  dispatch({ type: "SET_WISHLIST", payload: wishlist });
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

    localStorage.setItem("data", JSON.stringify(res.data.foundUser));
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

export async function toggleWishList(
  dispatch,
  product,
  setIsUpdating,
  state,
  token
) {
  setIsUpdating(true);
  if (!isInList(state.productsInWishList, product._id)) {
    try {
      const res = await axios({
        method: "post",
        url: "/api/user/wishlist",
        data: {
          product,
        },
        headers: {
          authorization: token,
        },
      });
      if ((res.status = "200" || res.status == "201")) {
        dispatch({ type: "ADD_TO_WISHLIST", payload: res.data.wishlist });

        let data = JSON.parse(localStorage.getItem("data"));
        data = { ...data, wishlist: [...data.wishlist, product] };
        localStorage.setItem("data", JSON.stringify(data));
      }
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      throw new Error("can not be added to wishlist");
    }
  } else {
    removeItemFromWishlist(dispatch, product, setIsUpdating, token);
  }
}

export async function removeItemFromWishlist(
  dispatch,
  product,
  setIsUpdating,

  token
) {
  try {
    const res = await axios({
      method: "delete",
      url: `/api/user/wishlist/${product["_id"]}`,
      headers: {
        authorization: token,
      },
    });

    if ((res.status = "200" || res.status == "201")) {
      console.log(res);
      dispatch({
        type: "REMOVE_ITEM_FROM_WISHLIST",
        payload: res.data.wishlist,
      });

      let data = JSON.parse(localStorage.getItem("data"));
      data = { ...data, wishlist: res.data.wishlist };
      localStorage.setItem("data", JSON.stringify(data));
    }

    setIsUpdating(false);
  } catch (error) {
    setIsUpdating(false);
    throw new Error("can not be deleted from wishlist");
  }
}
