import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import {
  Header,
  Home,
  ProductListing,
  Cart,
  Wishlist,
  Login,
  Signup,
  Footer,
} from "./components";

import {
  getProducts,
  getCategories,
  getWishList,
} from "./utils/server-requests";
import { useStateContext, useAuth } from "./context";

import "./style.css";

function App() {
  const { dispatch } = useStateContext();
  const {
    state: { token },
  } = useAuth();

  useEffect(() => {
    getProducts(dispatch);
    getCategories(dispatch);
    getWishList(dispatch, token);
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
