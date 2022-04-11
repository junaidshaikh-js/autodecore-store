import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

import { ProductHeader } from "./ProductHeader";
import { BtnIcon } from "../buttons";
import { ProductCardPrice } from "./ProductCardPrice";
import { AddToCartBtn } from "./AddToCartBtn";
import { useAuth, useData, useToast } from "../../context";
import { useNavigate } from "react-router-dom";
import { isInList, toggleWishList } from "../../utils";

export function ProductCard({ product }) {
  const { state, dispatch } = useData();
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    state: { token },
  } = useAuth();
  const { setToastMessage } = useToast();
  const navigate = useNavigate();

  return (
    <article className="card card-vertical p-1 border-m product-card card-icon">
      <div className="card-image flex align-center">
        <img className="img-responsive" src={product.image} alt="product" />
      </div>

      <div className="card-body ml-1">
        <ProductHeader
          name={product.name}
          soldBy={product.soldBy}
          rating={product.rating}
        />

        <ProductCardPrice
          discountedPrice={product.discountedPrice}
          originalPrice={product.originalPrice}
          discountPercent={product.discountPercent}
        />

        <div className="card-btn-container">
          <AddToCartBtn product={product} />

          <BtnIcon
            cnames="btn icon-btn-primary btn-wishlist"
            onClick={() =>
              token
                ? toggleWishList(
                    dispatch,
                    product,
                    setIsUpdating,
                    state,
                    token,
                    setToastMessage
                  )
                : navigate("/login")
            }
            disabled={isUpdating}
          >
            {isInList(state.productsInWishList, product._id) ? (
              <FaHeart color="red" fontSize="18px" />
            ) : (
              <FaRegHeart color="red" fontSize="18px" />
            )}
          </BtnIcon>
        </div>
      </div>
    </article>
  );
}
