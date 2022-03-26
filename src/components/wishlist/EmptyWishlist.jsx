export function EmptyWishlist() {
  return (
    <main className="empty-cart-main bg-white mx-auto pb-2">
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

        <p>Empty Wishlist</p>
        <p className="txt-sm">
          You have no items in your wishlist. Start adding!
        </p>
      </section>
    </main>
  );
}
