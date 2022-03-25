export function SortByPrice({ dispatch }) {
  return (
    <section>
      <h6>Sort</h6>

      <ul className="pl-1">
        <li>
          <label className="flex align-center">
            <input
              type="radio"
              name="sort"
              value="low to high"
              className="mr-1"
            />
            Price Low to High
          </label>
        </li>

        <li>
          <label className="flex align-center">
            <input
              type="radio"
              name="sort"
              value="high to low"
              className="mr-1"
            />
            Price High to Low
          </label>
        </li>
      </ul>
    </section>
  );
}
