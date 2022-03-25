export function FilterByAvailability({ dispatch, filters }) {
  return (
    <section>
      <h6>Availability</h6>
      <label className="flex align-center pl-1">
        <input
          type="checkbox"
          className="mr-1"
          name="out of stock"
          aria-label="Out of Stock"
          checked={filters.inStock}
        />
        Out of stock
      </label>
    </section>
  );
}
