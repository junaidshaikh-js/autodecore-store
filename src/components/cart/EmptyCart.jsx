import { Link } from "react-router-dom";

export function EmptyCart() {
  return (
    <main className="empty-cart-main bg-white mx-auto pb-2">
      <header>
        <h1 className="h4 p-1 pb-sm">My Cart</h1>
      </header>

      <section
        className="txt-center
      "
      >
        <figure>
          <img
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            width={200}
            height={300}
            alt="EMPTY CART"
          />
        </figure>

        <p>Your cart is empty!</p>
        <p className="txt-sm">Add items to it now.</p>

        <Link to="/products">
          <button className="btn btn-primary">Shop Now</button>
        </Link>
      </section>
    </main>
  );
}
