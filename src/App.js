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
  Error404,
} from "./components";

import {
  getProducts,
  getCategories,
  getWishList,
  getCart,
} from "./utils/server-requests";
import { useData, useAuth } from "./context";

import "./style.css";

function App() {
  const { dispatch } = useData();
  const {
    state: { token },
  } = useAuth();

  useEffect(() => {
    getProducts(dispatch);
    getCategories(dispatch);
    getWishList(dispatch, token);
    getCart(dispatch, token);
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
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
