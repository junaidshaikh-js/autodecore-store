import { useStateContext } from "../../context";
import { ProductDeliverAddress } from "./ProductDeliverAddress";
import { CartProducts } from "./CartProducts";

export function CartDetails() {
  const {
    state: { productsInCart },
  } = useStateContext();

  return (
    <section className="cart-details p-1 bg-white">
      <h1 className="h4 border-bottom pb-sm">
        My Cart <span>({productsInCart.length})</span>
      </h1>

      <ProductDeliverAddress />
      <CartProducts />
    </section>
  );
}
