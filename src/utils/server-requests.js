import axios from "axios";

import { isInList, getProduct } from "./helper-function";

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

export const getCart = async (dispatch, token) => {
  if (token) {
    const cart = JSON.parse(localStorage.getItem("data")).cart;

    dispatch({ type: "SET_CART", payload: cart });
  }
};

export const getWishList = async (dispatch, token) => {
  if (token) {
    const wishlist = JSON.parse(localStorage.getItem("data")).wishlist;

    dispatch({ type: "SET_WISHLIST", payload: wishlist });
  }
};

export const login = async (
  dispatch,
  email,
  password,
  setIsLoading,
  navigate,
  setLoginError
) => {
  setIsLoading(true);
  try {
    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });

    if (res.status == 200 || res.status == 201) {
      dispatch({ type: "LOGIN", payload: res.data });

      localStorage.setItem("data", JSON.stringify(res.data.foundUser));
      localStorage.setItem("token", res.data.encodedToken);
      localStorage.setItem("userName", res.data.foundUser.firstName);
    }

    setIsLoading(false);
    navigate("/");
  } catch (error) {
    if (error.response?.status == 404) {
      setLoginError("You are not registered with us. Please sign up");
    } else {
      setLoginError("Wrong password");
    }

    setIsLoading(false);
    throw new Error("can not be logged in");
  }
};

export const signup = async (
  email,
  password,
  firstName,
  lastName,
  dispatch,
  setIsLoading,
  navigate
) => {
  try {
    const res = await axios({
      method: "post",
      url: "/api/auth/signup",
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });

    if (res.status == 201) {
      login(dispatch, email, password, setIsLoading, navigate);
    }
  } catch (error) {
    if (error.response?.status == 422) {
      // TODO: to be handle with toast later
      console.log("You are already registerd. Please log in");
    }

    throw new Error("Can not sign up");
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

export const addItemToCart = async (
  dispatch,
  product,
  setIsUpdating,
  state,
  token
) => {
  try {
    setIsUpdating(true);
    const res = await axios({
      method: "post",
      url: "/api/user/cart",
      data: {
        product,
      },
      headers: {
        authorization: token,
      },
    });
    if (res.status == 200 || res.status == 201) {
      dispatch({
        type: "SET_CART",
        payload: res.data.cart,
      });

      let data = JSON.parse(localStorage.getItem("data"));
      data = { ...data, cart: [...data.cart, product] };
      localStorage.setItem("data", JSON.stringify(data));
    }
    setIsUpdating(false);
  } catch (error) {
    throw new Error("failed! try again");
  }
};

export async function removeItemFromCart(
  dispatch,
  product,
  setIsUpdating,
  token
) {
  setIsUpdating(true);
  try {
    const res = await axios({
      method: "delete",
      url: `/api/user/cart/${product._id}`,
      headers: {
        authorization: token,
      },
    });

    if (res.status == 200 || res.status == 201) {
      dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: res.data.cart });
    }

    let data = JSON.parse(localStorage.getItem("data"));
    data = { ...data, cart: res.data.cart };
    localStorage.setItem("data", JSON.stringify(data));

    setIsUpdating(false);
  } catch (error) {
    throw new Error("Item can not be removed");
  }
}

export async function saveToWishlist(
  dispatch,
  product,
  setIsUpdating,
  state,
  token
) {
  try {
    removeItemFromCart(dispatch, product, setIsUpdating, token);

    if (!isInList(state.productsInWishList, product._id)) {
      toggleWishList(dispatch, product, setIsUpdating, state, token);
    }
  } catch (error) {
    throw new Error("Item can not be saved to wishlist");
  }
}

export async function updateProductQuantity(
  dispatch,
  product,
  setIsUpdating,
  state,
  token,
  type
) {
  setIsUpdating(true);
  if (product.qty >= product.avalQty && type == "increment") {
    alert(`Can not than ${product.avalQty}`);
    setIsUpdating(false);
  } else {
    try {
      const res = await axios({
        method: "post",
        url: `/api/user/cart/${product._id}`,
        data: {
          action: {
            type,
          },
        },
        headers: {
          authorization: token,
        },
      });

      if (res.status == 200 || res.status == 201) {
        dispatch({
          type: "UPDATE_CART_QUANTITY",
          payload: res.data.cart,
        });
      }

      let data = JSON.parse(localStorage.getItem("data"));
      data = { ...data, cart: res.data.cart };
      localStorage.setItem("data", JSON.stringify(data));

      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
    }
  }
}

export async function moveToCart(
  dispatch,
  product,
  setIsUpdating,
  state,
  token,
  navigate
) {
  try {
    if (!isInList(state.productsInCart, product._id)) {
      await addItemToCart(dispatch, product, setIsUpdating, state, token);
    } else {
      const cartProduct = getProduct(state.productsInCart, product._id);

      if (cartProduct.qty < cartProduct.avalQty) {
        await updateProductQuantity(
          dispatch,
          product,
          setIsUpdating,
          state,
          token,
          "increment"
        );
      }
    }

    navigate("/cart");
  } catch (error) {
    throw new Error("Can not be added to cart");
  }
}
