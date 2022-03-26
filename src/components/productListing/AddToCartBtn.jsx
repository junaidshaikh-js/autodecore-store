import { useState } from "react";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

export function AddToCartBtn({ product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const {
    state: { token },
  } = useAuth();
  const navigate = useNavigate();

  function handleAddToCart(product) {
    console.log("adding to cart");
  }

  return (
    <button
      className="w-100 btn-addtocart btn btn-complementary"
      disabled={product.inStock || isAddingToCart ? false : true}
      onClick={() => {
        token ? handleAddToCart(product) : navigate("/login");
      }}
    >
      {!product.inStock ? "Out of stock" : "Add to cart"}
    </button>
  );
}
