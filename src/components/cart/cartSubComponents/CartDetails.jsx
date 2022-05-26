import { useData } from "../../../context";
import { ProductDeliverAddress } from "./ProductDeliverAddress";
import { CartProduct } from "./CartProduct";

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
        <CartProduct product={product} key={product._id} />
      ))}
    </section>
  );
}
