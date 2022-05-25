import { ProductHeader, ProductCardPrice } from "../../productListing";
import { Link } from "react-router-dom";

export function CartProductInfo({
  product: {
    productId,
    image,
    name,
    soldBy,
    rating,
    discountedPrice,
    originalPrice,
    discountPercent,
  },
}) {
  return (
    <Link to={`/product/${productId}`}>
      <div className="card-product-info flex flex-column">
        <div className="card-image mr-sm  align-self-center">
          <img className="img-responsive" src={image[0]} alt="product" />
        </div>
        <div className="card-body ml-sm">
          <ProductHeader name={name} soldBy={soldBy} rating={rating} />
          <ProductCardPrice
            discountedPrice={discountedPrice}
            originalPrice={originalPrice}
            discountPercent={discountPercent}
          />
        </div>
      </div>
    </Link>
  );
}
