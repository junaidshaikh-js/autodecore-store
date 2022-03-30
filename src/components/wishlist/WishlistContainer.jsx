import { useData } from "../../context";
import { EmptyWishlist } from "./EmptyWishlist";
import { WishlistCard } from "./WishlistCard";

export function WishlistContainer() {
  const { state } = useData();

  return (
    <section className="wishlist-container bg-white m-1 p-1 flex-grow">
      <header className=" border-bottom">
        <h1 className="h4">My Wishlist ({state.productsInWishList.length})</h1>
      </header>

      {state.productsInWishList.length ? (
        state.productsInWishList.map((product) => {
          return (
            <article
              className="card card-horizontal p-1 border-m product-card"
              key={product._id}
            >
              <WishlistCard product={product} />
            </article>
          );
        })
      ) : (
        <EmptyWishlist />
      )}
    </section>
  );
}
