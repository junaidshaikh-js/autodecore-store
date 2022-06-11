import { ProductHeader } from "../../productListing/ProductHeader";
import { ProductCardPrice } from "../../productListing/ProductCardPrice";
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
    <div className="w-100">
      <Link
        to={`/product/${productId}`}
        className="card-product-info flex flex-column"
      >
        <div className="card-image mr-sm  align-self-center txt-center">
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
      </Link>
    </div>
  );
}
