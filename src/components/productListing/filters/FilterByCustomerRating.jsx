export function FilterByCustomerRating({ dispatch, filters }) {
  const ratingFilters = [
    "four and above",
    "three and above",
    "two and above",
    "one and above",
  ];

  return (
    <section>
      <h6>Customer Ratings</h6>

      <ul className="pl-1">
        {ratingFilters.map((ratingFilter, index) => {
          return (
            <li key={ratingFilter}>
              <label className="flex align-center">
                <input
                  type="radio"
                  name="customer-rating"
                  value={ratingFilter}
                  className="mr-1"
                  onChange={() => {
                    dispatch({
                      type: "SORT_BY_RATING",
                      payload: ratingFilters.length - index,
                    });
                  }}
                  checked={filters.rating === ratingFilters.length - index}
                />
                {ratingFilters.length - index}{" "}
                <i className="fas fa-star px-sm" title="star"></i> & above
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
