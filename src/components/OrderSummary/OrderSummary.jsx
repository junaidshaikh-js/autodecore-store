import { useLocation, Link } from "react-router-dom";

import "./order-summary.css";
import { OrderCard } from "./OrderCard";

export const OrderSummary = () => {
  const userData = JSON.parse(localStorage.getItem("data"));
  const location = useLocation();
  const { orderId, amount, deliveredBy, name, delivery, products } =
    location.state;

  const getDeliveryDate = (seconds) => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const deliveryDate = new Date(seconds);
    const weekDay = weekDays[deliveryDate.getDay()];
    const day = deliveryDate.getDay();
    const date = deliveryDate.getDate();
    const year = deliveryDate.getFullYear();

    return `${weekDay}, ${day}/${date}/${year} `;
  };

  return (
    <main className="order-summary-main">
      <header className="txt-center">
        <h1>Thank you for your order</h1>
        <p>
          An email confirmation had been sent to{" "}
          <span className="txt-bold">{userData.email}</span>
        </p>
      </header>

      <section className="order-details mx-1 p-1 bg-white">
        <div>
          <h3 className="h5 txt-secondary">Order Id</h3>
          <p className="txt-bold">{orderId}</p>
        </div>
        <div>
          <h3 className="h5 txt-secondary">Order total</h3>
          <p className="txt-bold">Rs. {amount}</p>
        </div>
        <div>
          <h3 className="h5 txt-secondary">Delivered by</h3>
          <p className="txt-bold">
            <time>{getDeliveryDate(deliveredBy)}</time>
          </p>
        </div>
        <div>
          <h3 className="h5 txt-secondary">Delivered to</h3>
          <p className="txt-bold">{name}</p>
          <p className="">{delivery}</p>
        </div>
      </section>

      <section className="order-product-details p-1 b my-2 mx-1">
        <h2>Product Ordered</h2>

        <div>
          {products.map((product) => {
            return <OrderCard product={product} key={product.id} />;
          })}
        </div>

        <div className="txt-center">
          <Link to="/products" className="">
            <button className="btn btn-primary">Shop More</button>
          </Link>
        </div>
      </section>
    </main>
  );
};
