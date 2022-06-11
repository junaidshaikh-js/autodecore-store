import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth, useData, useToast } from "../../context";
import { isInList, addItemToCart } from "../../utils";
import { InlineLoader } from "../loader/InlineLoader";

export function AddToCartBtn({ product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const {
    state: { token },
  } = useAuth();

  const { state, dispatch } = useData();
  const { setToastMessage } = useToast();

  const navigate = useNavigate();
  const location = useLocation();

  function handleAddToCart(product) {
    if (isInList(state.productsInCart, product._id))
      navigate("/cart", { replace: true });
    else {
      addItemToCart(
        dispatch,
        product,
        setIsAddingToCart,
        state,
        token,
        setToastMessage
      );
    }
  }

  return (
    <button
      className="w-100 btn-addtocart btn btn-complementary"
      disabled={product.inStock || isAddingToCart ? false : true}
      onClick={() => {
        token
          ? handleAddToCart(product)
          : navigate("/login", { state: { location } });
      }}
    >
      {!product.inStock ? (
        "OUT OF STOCK"
      ) : isAddingToCart ? (
        <span className="flex justify-center align-center">
          <InlineLoader /> "Adding"
        </span>
      ) : isInList(state.productsInCart, product._id) ? (
        "Go to Cart"
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}
