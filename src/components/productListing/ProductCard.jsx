import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  return (
    <article className="card card-vertical p-1 border-m product-card card-icon">
      <Link to={`/product/${product.productId}`}>
        <div className="card-image flex align-center">
          <img
            className="img-responsive"
            src={product.image[0]}
            alt="product"
          />
        </div>
      </Link>

      <div className="card-body ml-1">
        <Link to={`/product/${product.productId}`}>
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
        </Link>

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
                : navigate("/login", { state: { location } })
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
