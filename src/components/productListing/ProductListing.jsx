import { useStateContext } from "../../context/state-context";
import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

import "./product-listing.css";

export function ProductListing() {
  const {
    state: { products },
  } = useStateContext();

  return (
    <main className="product-listing flex flex-column">
      <>
        <Filter />

        <section className="products-section p-1 my-1 mx-1 flex-grow bg-white">
          <p className="h5">Showing all products ({products.length})</p>

          <div className="product-container grid mt-2">
            {products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        </section>
      </>
    </main>
  );
}
