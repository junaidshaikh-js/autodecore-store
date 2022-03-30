import { CartProductInfo } from "./CartProductInfo";
import { CartProductActionBtn } from "./CartProductActionBtn";

export function CartProduct({ product }) {
  return (
    <article className="card card-horizontal py-1 justify-start">
      <CartProductInfo product={product} />
      <CartProductActionBtn product={product} />
    </article>
  );
}
