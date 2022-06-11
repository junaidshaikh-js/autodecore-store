import axios from "axios";
import { v4 as uuid } from "uuid";

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
  setToastMessage,
  from
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
    navigate(from);
    setToastMessage({ type: "success", message: "Login Successful!" });
  } catch (error) {
    if (error.response?.status == 404) {
      setToastMessage({
        type: "info",
        message: "You are not registered with us. Please sign up",
      });
    } else {
      setToastMessage({ type: "error", message: "Inavid email or password." });
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
  navigate,
  setToastMessage
) => {
  setIsLoading(true);
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

      setIsLoading(false);

      setToastMessage({ type: "success", message: "Signup Successful" });
    }
  } catch (error) {
    setIsLoading(false);
    if (error.response?.status == 422) {
      setToastMessage({
        type: "info",
        message: "You are already registerd. Please log in",
      });
    }

    throw new Error("Can not sign up");
  }
};

export const toggleWishList = async (
  dispatch,
  product,
  setIsUpdating,
  state,
  token,
  setToastMessage
) => {
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
      setToastMessage({ type: "info", message: "Item added to wishlist" });
    } catch (error) {
      setToastMessage({
        type: "error",
        message: "Action failed. Please try again later.",
      });
      throw new Error("can not be added to wishlist");
    }
  } else {
    removeItemFromWishlist(
      dispatch,
      product,
      setIsUpdating,
      token,
      setToastMessage
    );
  }
};

export const removeItemFromWishlist = async (
  dispatch,
  product,
  setIsUpdating,
  token,
  setToastMessage
) => {
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
    setToastMessage({ type: "info", message: "Item removed from wishlist" });
  } catch (error) {
    setIsUpdating(false);
    setToastMessage({
      type: "error",
      message: "Action failed. Please try again later.",
    });
    throw new Error("can not be deleted from wishlist");
  }
};

export const addItemToCart = async (
  dispatch,
  product,
  setIsUpdating,
  state,
  token,
  setToastMessage
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

    setToastMessage({ type: "info", message: "Item added to cart" });
    setIsUpdating(false);
  } catch (error) {
    setIsUpdating(false);
    setToastMessage({
      type: "error",
      message: "Action failed. Please try again later.",
    });
    throw new Error("failed! try again");
  }
};

export const removeItemFromCart = async (
  dispatch,
  product,
  setIsUpdating,
  token,
  setToastMessage
) => {
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

    setToastMessage({ type: "info", message: "Item is removed from cart." });
  } catch (error) {
    setToastMessage({
      type: "error",
      message: "Action failed. Please try again later.",
    });
    throw new Error("Item can not be removed");
  }
};

export const saveToWishlist = async (
  dispatch,
  product,
  setIsUpdating,
  state,
  token,
  setToastMessage
) => {
  try {
    removeItemFromCart(dispatch, product, setIsUpdating, token);

    if (!isInList(state.productsInWishList, product._id)) {
      toggleWishList(dispatch, product, setIsUpdating, state, token);
    }

    setToastMessage({ type: "info", message: "Item is saved to wishlist" });
  } catch (error) {
    setToastMessage({
      type: "error",
      message: "Action failed. Please try again later.",
    });
    throw new Error("Item can not be saved to wishlist");
  }
};

export const updateProductQuantity = async (
  dispatch,
  product,
  setIsUpdating,
  state,
  token,
  type,
  setToastMessage
) => {
  setIsUpdating(true);

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
    setToastMessage({
      type: "error",
      message: "Action failed. Please try again later.",
    });
  }
};

export const moveToCart = async (
  dispatch,
  product,
  setIsUpdating,
  state,
  token,
  navigate,
  setToastMessage
) => {
  try {
    if (!isInList(state.productsInCart, product._id)) {
      await addItemToCart(
        dispatch,
        product,
        setIsUpdating,
        state,
        token,
        setToastMessage
      );
    } else {
      const cartProduct = getProduct(state.productsInCart, product._id);

      if (cartProduct.qty < cartProduct.avalQty) {
        await updateProductQuantity(
          dispatch,
          product,
          setIsUpdating,
          state,
          token,
          "increment",
          setToastMessage
        );
      }

      navigate("/cart");
    }

    navigate("/cart");
  } catch (error) {
    setToastMessage({
      type: "error",
      message: "Action failed. Please try again later.",
    });
    throw new Error("Can not be added to cart");
  }
};

export const addAddress = (values, authDispatch, setToastmessage) => {
  const newAddress = { id: uuid(), ...values };
  authDispatch({ type: "ADD_ADDRESS", payload: newAddress });

  let data = JSON.parse(localStorage.getItem("data"));
  data = { ...data, addresses: [...data.addresses, newAddress] };
  localStorage.setItem("data", JSON.stringify(data));

  setToastmessage({ type: "success", message: "Address added" });
};

export const deleteAddress = (id, addresses, authDispatch, setToastMessage) => {
  const updatedAddressList = addresses.filter((_address) => _address.id !== id);

  authDispatch({ type: "DELETE_ADDRESS", payload: updatedAddressList });

  let data = JSON.parse(localStorage.getItem("data"));
  data = { ...data, addresses: updatedAddressList };
  localStorage.setItem("data", JSON.stringify(data));

  setToastMessage({ type: "success", message: "Address deleted" });
};

export const editAddress = (
  id,
  addresses,
  authDispatch,
  values,
  setToastMessage,
  setIsEditing
) => {
  const updatedAddressList = addresses.map((_address) => {
    if (_address.id === id) {
      return { ..._address, ...values };
    }

    return _address;
  });

  authDispatch({ type: "UPDATE_ADDRESS", payload: updatedAddressList });

  let data = JSON.parse(localStorage.getItem("data"));
  data = { ...data, addresses: updatedAddressList };
  localStorage.setItem("data", JSON.stringify(data));

  setToastMessage({ type: "success", message: "Address updated" });

  setIsEditing({ index: -1 });
};

export const emptyCart = async (token, dataDispatch) => {
  try {
    const res = await axios.delete("/api/user/cart", {
      headers: {
        authorization: token,
      },
    });

    if (res.status == 200 || res.status == 201) {
      dataDispatch({ type: "EMPTY_CART", payload: res.data.cart });
    }

    let data = JSON.parse(localStorage.getItem("data"));
    data = { ...data, cart: res.data.cart };
    localStorage.setItem("data", JSON.stringify(data));
  } catch (error) {
    throw new Error("Can not empty cart");
  }
};
