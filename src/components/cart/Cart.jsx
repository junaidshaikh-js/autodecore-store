import { useState } from "react";
import { useData, useAuth } from "../../context";
import { EmptyCart } from "./EmptyCart";
import { CartDetails, CartPriceDetails } from "./cartSubComponents";

import "./cart.css";

export function Cart() {
  const {
    state: { productsInCart },
  } = useData();

  const {
    state: { addresses },
  } = useAuth();

  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
  const currentAddress = addresses[currentAddressIndex] || null;

  return (
    <>
      {!productsInCart.length ? (
        <EmptyCart />
      ) : (
        <main className="cart-main mt-1">
          <div className="cart-container flex flex-column">
            <CartDetails
              currentAddressIndex={currentAddressIndex}
              currentAddress={currentAddress}
              setCurrentAddressIndex={setCurrentAddressIndex}
            />
            <CartPriceDetails currentAddress={currentAddress} />
          </div>
        </main>
      )}
    </>
  );
}
