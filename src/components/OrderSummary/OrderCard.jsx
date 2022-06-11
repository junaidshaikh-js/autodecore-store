import { Link } from "react-router-dom";

import { ProductHeader } from "../productListing/ProductHeader";
import { ProductCardPrice } from "../productListing/ProductCardPrice";

export const OrderCard = ({ product }) => {
  return (
    <article className="order-card bg-white px-sm flex mb-1">
      <figure className="card-image align-self-center">
        <Link to={`/product/${product.productId}`}>
          <img
            className="img-responsive"
            src={product.image[0]}
            alt="product"
          />
        </Link>
      </figure>

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
      </div>
    </article>
  );
};
