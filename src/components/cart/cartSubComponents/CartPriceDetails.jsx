import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useAuth, useData } from "../../../context";
import { PriceDetailsRow } from "./PriceDetailsRow";
import { emptyCart } from "../../../utils";

function calculateCartPrice(productsInCart) {
  const priceObject = {
    price: 0,
    discount: 0,
    deliveryCharge: 0,
    totalAmount: 0,
    moneySaved: 0,
  };

  return productsInCart.reduce((acc, value) => {
    const productPrice = value.qty * value.originalPrice;
    const productDisconut =
      value.qty * (value.originalPrice - value.discountedPrice);
    const deliveryCharge =
      acc.totalAmount + value.discountedPrice > 500 ? 0 : 50;

    return {
      ...acc,
      price: acc.price + productPrice,
      discount: acc.discount + productDisconut,
      deliveryCharge: deliveryCharge,
      totalAmount: acc.totalAmount + productPrice - productDisconut,
      moneySaved: acc.moneySaved + value.qty * productDisconut + deliveryCharge,
    };
  }, priceObject);
}

export function CartPriceDetails({ currentAddress }) {
  const {
    state: { productsInCart },
    dispatch: dataDispatch,
  } = useData();
  const {
    state: { token },
  } = useAuth();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("data"));

  const { price, discount, deliveryCharge, totalAmount, moneySaved } =
    calculateCartPrice(productsInCart);

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const orderAddress = ` ${currentAddress?.address} ${currentAddress?.city},${currentAddress?.state}, ${currentAddress?.pincode}`;

  const displayRazorpay = async ({ amount }) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load, check you connection");
      return;
    }

    const options = {
      key: "rzp_test_5StHCHiRhXsWjs",
      amount: amount * 100,
      currency: "INR",
      name: "AutoDecore",
      description: "Thank you for shopping with us",
      image: "https://autodecore-store.netlify.app/favicon.png",
      handler: async (response) => {
        const orderId = uuid();
        const orderData = {
          orderId,
          products: [...productsInCart],
          amount: totalAmount,
          paymentId: response.razorpay_payment_id,
          name: currentAddress.name,
          mobile: currentAddress.mobileNo,
          delivery: orderAddress,
          deliveredBy: new Date().setDate(new Date().getDate() + 7),
        };

        emptyCart(token, dataDispatch);
        dataDispatch({ type: "SET_ORDERS", payload: orderData });

        navigate("/order-summary", { state: orderData });
      },

      prefill: {
        name: `${currentAddress.name}`,
        email: `${userData.email}`,
        contact: `${currentAddress.mobileNo}`,
      },
      theme: {
        color: "hsl(217, 87%, 55%)",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const placeOrder = (amount) => {
    if (currentAddress) {
      displayRazorpay({ amount });
    } else {
      alert("Please Select Address");
    }
  };

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
          onClick={() => placeOrder(totalAmount)}
        >
          Place Order
        </button>
      </div>
    </section>
  );
}
