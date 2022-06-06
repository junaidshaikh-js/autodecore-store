import { useData } from "../../../context";
import { ProductDeliverAddress } from "./ProductDeliverAddress";
import { CartProductInfo } from "./CartProductInfo";
import { CartProductActionBtn } from "./CartProductActionBtn";

export function CartDetails({
  currentAddressIndex,
  currentAddress,
  setCurrentAddressIndex,
}) {
  const {
    state: { productsInCart },
  } = useData();

  return (
    <section className="cart-details p-1 bg-white">
      <h1 className="h4 border-bottom pb-sm">
        My Cart <span>({productsInCart.length})</span>
      </h1>

      <ProductDeliverAddress
        currentAddressIndex={currentAddressIndex}
        currentAddress={currentAddress}
        setCurrentAddressIndex={setCurrentAddressIndex}
      />

      {productsInCart.map((product) => (
        <article
          className="card card-horizontal py-1 justify-start"
          key={product.id}
        >
          <CartProductInfo product={product} />
          <CartProductActionBtn product={product} />
        </article>
      ))}
    </section>
  );
}
