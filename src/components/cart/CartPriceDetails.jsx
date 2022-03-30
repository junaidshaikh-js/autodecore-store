import { useStateContext } from "../../context";
import { PriceDetailsRow } from "./PriceDetailsRow";

function calculateCartPrice(productsInCart) {
  const priceObject = {
    price: 0,
    discount: 0,
    deliveryCharge: 0,
    totalAmount: 0,
    moneySaved: 0,
  };

  return productsInCart.reduce((acc, value) => {
    const productPrice = value.qty * value.discountedPrice;
    const productDisconut = value.originalPrice - value.discountedPrice;
    const deliveryCharge = acc.price + value.discountedPrice > 500 ? 0 : 50;

    return {
      ...acc,
      price: acc.price + productPrice,
      discount: acc.discount + value.qty * productDisconut,
      deliveryCharge: deliveryCharge,
      totalAmount: acc.price + productPrice + deliveryCharge,
      moneySaved: acc.moneySaved + value.qty * productDisconut + deliveryCharge,
    };
  }, priceObject);
}

export function CartPriceDetails() {
  const {
    state: { productsInCart },
  } = useStateContext();

  const { price, discount, deliveryCharge, totalAmount, moneySaved } =
    calculateCartPrice(productsInCart);

  return (
    <section className="price-details bg-white p-1 my-1">
      <header>
        <p className="h4 border-bottom pb-sm txt-secondary">Price Details</p>
      </header>

      <div className="border-bottom-dotted">
        <PriceDetailsRow
          title="Price"
          titleState={productsInCart.length}
          value={`₹${price}`}
        />

        <PriceDetailsRow
          title="Discount"
          value={`- ₹${discount}`}
          valueclass="txt-green"
        />

        <PriceDetailsRow
          title="Delivery Charges"
          value={`₹${deliveryCharge}`}
        />
      </div>

      <div className="border-bottom-dotted">
        <div className="flex justify-between txt-bold my-1">
          <span>Total Amount</span>

          <span>{`₹${totalAmount}`}</span>
        </div>
      </div>

      <div className="my-1">
        <span className="txt-green txt-semibold">
          You will save ₹{moneySaved} on this order
        </span>
      </div>

      <div className="mt-1 flex">
        <button
          className="btn btn-complementary ml-auto
        "
        >
          Place Order
        </button>
      </div>
    </section>
  );
}
