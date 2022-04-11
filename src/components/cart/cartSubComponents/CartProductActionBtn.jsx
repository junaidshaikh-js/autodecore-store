import { FaMinus, FaPlus, FaTrash, FaHeart } from "react-icons/fa";
import { useState } from "react";

import {
  removeItemFromCart,
  saveToWishlist,
  updateProductQuantity,
} from "../../../utils";
import { useAuth, useData, useToast } from "../../../context";

export function CartProductActionBtn({ product }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const { state, dispatch } = useData();
  const {
    state: { token },
  } = useAuth();
  const { setToastMessage } = useToast();

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
              "decrement",
              setToastMessage
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
          disabled={product.qty >= product.avalQty || isUpdating}
          onClick={() =>
            updateProductQuantity(
              dispatch,
              product,
              setIsUpdating,
              state,
              token,
              "increment",
              setToastMessage
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
            saveToWishlist(
              dispatch,
              product,
              setIsUpdating,
              state,
              token,
              setToastMessage
            )
          }
        >
          <FaHeart color="gray" />{" "}
          <span className="ml-sm">Save to wishlist</span>
        </button>

        <button
          className="btn"
          disabled={isUpdating}
          onClick={() => {
            removeItemFromCart(
              dispatch,
              product,
              setIsUpdating,
              token,
              setToastMessage
            );
          }}
        >
          <FaTrash color="gray" /> <span className="ml-sm">Remove</span>
        </button>
      </div>
    </section>
  );
}
