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
  Toast,
  SingleProductPage,
  UserProfile,
  PersonalInfo,
  Addresses,
  Orders,
  OrderSummary,
  ScrollToTop,
} from "./components";

import {
  getProducts,
  getCategories,
  getWishList,
  getCart,
} from "./utils/server-requests";
import { useData, useAuth, useToast } from "./context";
import { PrivateRoute } from "./PrivateRoute";

import "./style.css";

function App() {
  const { dispatch } = useData();
  const {
    state: { token },
  } = useAuth();
  const {
    toastMessage: { type, message },
  } = useToast();

  useEffect(() => {
    getProducts(dispatch);
    getCategories(dispatch);
    getWishList(dispatch, token);
    getCart(dispatch, token);
  }, []);

  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error404 />} />

        {/* private routes */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />

        <Route path="/profile" element={<UserProfile />}>
          <Route path="/profile" element={<PersonalInfo />} />
          <Route path="/profile/addresses" element={<Addresses />} />
          <Route path="/profile/orders" element={<Orders />} />
        </Route>

        <Route
          path="/order-summary"
          element={
            <PrivateRoute>
              <OrderSummary />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      <Toast type={type} message={message} />
    </>
  );
}

export default App;
