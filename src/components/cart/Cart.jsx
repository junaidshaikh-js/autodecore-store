import { useStateContext } from "../../context";
import { EmptyCart } from "./EmptyCart";
import { CartDetails } from "./CartDetails";
import { CartPriceDetails } from "./CartPriceDetails";

import "./cart.css";

export function Cart() {
  const {
    state: { productsInCart },
  } = useStateContext();

  return (
    <>
      {!productsInCart.length ? (
        <EmptyCart />
      ) : (
        <main className="cart-main mt-1">
          <div className="cart-container flex flex-column">
            <CartDetails />
            <CartPriceDetails />
          </div>
        </main>
      )}
    </>
  );
}
