import { useData } from "../../context";
import { EmptyCart } from "./EmptyCart";
import { CartDetails, CartPriceDetails } from "./cartSubComponents";

import "./cart.css";

export function Cart() {
  const {
    state: { productsInCart },
  } = useData();

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
