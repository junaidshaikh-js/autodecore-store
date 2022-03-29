import { FaMinus, FaPlus, FaTrash, FaHeart } from "react-icons/fa";
import { useState } from "react";

export function CartProductActionBtn({ product }) {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <section className="cart-product-actions w-100">
      <div className="product-count ml-sm flex align-center">
        <button
          className="btn decrease-product-quantity"
          disabled={product.qty === 1 || isUpdating ? true : false}
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

        <button className="btn increase-product-quantity" disabled={isUpdating}>
          <FaPlus />
        </button>
      </div>

      <div className="pt-sm mt-sm  flex justify-between w-100">
        <button className="btn" disabled={isUpdating}>
          <FaHeart color="gray" />{" "}
          <span className="ml-sm">Save to wishlist</span>
        </button>

        <button className="btn" disabled={isUpdating}>
          <FaTrash color="gray" /> <span className="ml-sm">Remove</span>
        </button>
      </div>
    </section>
  );
}
