import { useState } from "react";

export function AddToCartBtn({ product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  function handleAddToCart(product) {
    console.log("adding to cart");
  }

  return (
    <button
      className="w-100 btn-addtocart btn btn-complementary"
      disabled={product.inStock || isAddingToCart ? false : true}
      onClick={() => handleAddToCart(product)}
    >
      {!product.inStock ? "Out of stock" : "Add to cart"}
    </button>
  );
}
