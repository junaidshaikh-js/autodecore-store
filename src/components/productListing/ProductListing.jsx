import { useData } from "../../context/data-context";
import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

import "./product-listing.css";
import { getFilteredProducts } from "./filters/filter-functions";
import NoProductFound from "../../assets/no-result.png";

export function ProductListing() {
  const {
    state: { products, filters },
  } = useData();

  const filteredProducts = getFilteredProducts(products, filters);
  return (
    <main className="product-listing flex flex-column">
      <>
        <Filter />

        <section className="products-section p-1 my-1 mx-1 flex-grow bg-white">
          <p className="h5">Showing all products ({filteredProducts.length})</p>

          {!filteredProducts.length ? (
            <div className="txt-center mt-2">
              <figure>
                <img src={NoProductFound} alt="No Product found" />
              </figure>

              <p className="txt-bold txt-md">No products available</p>
            </div>
          ) : (
            <div className="product-container grid mt-2">
              {filteredProducts.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
            </div>
          )}
        </section>
      </>
    </main>
  );
}
