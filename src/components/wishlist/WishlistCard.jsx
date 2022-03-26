import { useState } from "react";

import { ProductCardPrice } from "../productListing/ProductCardPrice";
import { ProductHeader } from "../productListing/ProductHeader";
import { BtnComplementary } from "../buttons";

export function WishlistCard({ product }) {
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <>
      <div className="card-image">
        <img className="img-responsive" src={product.image} alt="product" />
      </div>

      <div className="card-body mx-2">
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

        <BtnComplementary disabled={setIsUpdating}>
          Move to Cart
        </BtnComplementary>
      </div>

      <button className="btn wishlist-remove-btn" disabled={isUpdating}>
        <i className="fas fa-trash"></i>
      </button>
    </>
  );
}
