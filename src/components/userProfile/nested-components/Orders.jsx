import { Link } from "react-router-dom";
import { useData } from "../../../context";
import { OrderCard } from "../../OrderSummary/OrderCard";

export const Orders = () => {
  const {
    state: { orders },
  } = useData();

  return (
    <section className="profile-component m-1 flex-grow">
      {!orders.length ? (
        <div className="txt-center bg-white p-1">
          <h2>No orders found</h2>
          <Link to="/products">
            <button className="btn btn-primary">Order Now</button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>My Orders</h1>

          {orders.map(({ orderId, amount, name, delivery, products }) => {
            return (
              <article className="bg-white p-1 my-1" key={orderId}>
                <header className="border-bottom">
                  <h2 className="txt-green">Order confirmed</h2>
                  <p className="txt-secondary mt-0 ">
                    Order date: <time>{new Date().toLocaleDateString(0)}</time>
                  </p>
                  <div>
                    <h3 className="h5 txt-secondary">Order Id</h3>
                    <p className="txt-bold">{orderId}</p>
                  </div>
                  <div>
                    <h3 className="h5 txt-secondary">Order total</h3>
                    <p className="txt-bold">Rs. {amount}</p>
                  </div>
                  <div>
                    <h3 className="h5 txt-secondary">Delivered to</h3>
                    <p className="txt-bold">{name}</p>
                    <p className="">{delivery}</p>
                  </div>
                </header>

                <section>
                  <h2>Products</h2>
                  {products.map((product) => {
                    return <OrderCard product={product} key={product.id} />;
                  })}
                </section>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
