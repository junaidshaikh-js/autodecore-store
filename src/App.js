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

import { getProducts } from "./utils/server-requests";
import { useStateContext } from "./context/state-context";

import "./style.css";

function App() {
  const { dispatch } = useStateContext();

  useEffect(() => {
    getProducts(dispatch);
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
