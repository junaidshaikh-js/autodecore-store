export function FilterByPriceRange({ dispatch, filters }) {
  return (
    <section className="mb-2">
      <h6>Price</h6>
      <input
        type="range"
        className="w-100"
        min="100"
        max="2000"
        step="100"
        list="tickmarks"
        value={filters.price}
      />

      <datalist id="tickmarks">
        <option value="200" label="200"></option>
        <option value="400" label="400"></option>
        <option value="600" label="600"></option>
        <option value="800" label="800"></option>
        <option value="1000" label="1000"></option>
        <option value="1200" label="1200"></option>
        <option value="1400" label="1400"></option>
        <option value="1600" label="1600"></option>
        <option value="1800" label="1800"></option>
        <option value="2000" label="2000"></option>
      </datalist>

      <div className="txt-bold">
        <p>INR: 0 - {filters.price}</p>
      </div>
    </section>
  );
}
