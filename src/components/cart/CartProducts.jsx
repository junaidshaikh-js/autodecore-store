import { useStateContext } from "../../context";

import { CartProduct } from "./CartProduct";

export function CartProducts() {
  const {
    state: { productsInCart },
  } = useStateContext();

  return (
    <>
      {productsInCart.map((product) => (
        <CartProduct product={product} key={product._id} />
      ))}
    </>
  );
}
