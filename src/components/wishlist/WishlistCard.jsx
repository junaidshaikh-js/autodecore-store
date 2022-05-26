import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ProductCardPrice } from "../productListing/ProductCardPrice";
import { ProductHeader } from "../productListing/ProductHeader";
import { BtnComplementary } from "../buttons";
import { isInList, removeItemFromWishlist, moveToCart } from "../../utils";
import { useAuth, useData, useToast } from "../../context";

export function WishlistCard({ product }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { state, dispatch } = useData();
  const {
    state: { token },
  } = useAuth();
  const { setToastMessage } = useToast();

  const navigate = useNavigate();

  return (
    <>
      <Link to={`/product/${product.productId}`}>
        <div className="card-image txt-center">
          <img
            className="img-responsive"
            src={product.image[0]}
            alt="product"
          />
        </div>
      </Link>

      <div className="card-body mx-2">
        <Link to={`/product/${product.productId}`}>
          <ProductHeader
            name={product.name}
            soldBy={product.soldBy}
            rating={product.rating}
          />
          <ProductCardPrice
            originalPrice={product.originalPrice}
            discountPercent={product.discountPercent}
            discountedPrice={product.discountedPrice}
            cnames="flex align-center"
          />
        </Link>

        <BtnComplementary
          disabled={!product.inStock || isUpdating}
          onClick={() =>
            moveToCart(
              dispatch,
              product,
              setIsUpdating,
              state,
              token,
              navigate,
              setToastMessage
            )
          }
        >
          {!product.inStock
            ? "Out of stock"
            : isInList(state.productsInCart, product._id)
            ? "Go to Cart"
            : isUpdating
            ? "Moving to cart..."
            : "Move to Cart"}
        </BtnComplementary>
      </div>

      <button
        className="btn wishlist-remove-btn"
        disabled={isUpdating}
        onClick={() =>
          removeItemFromWishlist(
            dispatch,
            product,
            setIsUpdating,
            token,
            setToastMessage
          )
        }
      >
        <i className="fas fa-trash"></i>
      </button>
    </>
  );
}
