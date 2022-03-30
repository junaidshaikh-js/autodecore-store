import { FaMinus, FaPlus, FaTrash, FaHeart } from "react-icons/fa";
import { useState } from "react";

import {
  removeItemFromCart,
  saveToWishlist,
  updateProductQuantity,
} from "../../utils";
import { useAuth, useStateContext } from "../../context";

export function CartProductActionBtn({ product }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const { state, dispatch } = useStateContext();
  const {
    state: { token },
  } = useAuth();

  return (
    <section className="cart-product-actions w-100">
      <div className="product-count ml-sm flex align-center">
        <button
          className="btn decrease-product-quantity"
          disabled={product.qty === 1 || isUpdating ? true : false}
          onClick={() =>
            updateProductQuantity(
              dispatch,
              product,
              setIsUpdating,
              state,
              token,
              "decrement"
            )
          }
        >
          <FaMinus />
        </button>

        <input
          type="text"
          className="product-quantity-count txt-center mx-sm"
          value={product.qty}
          tabIndex="-1"
          readOnly
        />

        <button
          className="btn increase-product-quantity"
          disabled={isUpdating}
          onClick={() =>
            updateProductQuantity(
              dispatch,
              product,
              setIsUpdating,
              state,
              token,
              "increment"
            )
          }
        >
          <FaPlus />
        </button>
      </div>

      <div className="pt-sm mt-sm  flex justify-between w-100">
        <button
          className="btn"
          disabled={isUpdating}
          onClick={() =>
            saveToWishlist(dispatch, product, setIsUpdating, state, token)
          }
        >
          <FaHeart color="gray" />{" "}
          <span className="ml-sm">Save to wishlist</span>
        </button>

        <button
          className="btn"
          disabled={isUpdating}
          onClick={() => {
            removeItemFromCart(dispatch, product, setIsUpdating, token);
          }}
        >
          <FaTrash color="gray" /> <span className="ml-sm">Remove</span>
        </button>
      </div>
    </section>
  );
}
