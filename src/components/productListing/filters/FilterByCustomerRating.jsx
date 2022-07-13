export function FilterByCustomerRating({ dispatch, filters }) {
  const ratingFilters = [
    { title: "four and above", rating: 4 },
    { title: "three and above", rating: 3 },
    { title: "two and above", rating: 2 },
  ];

  return (
    <section>
      <h6>Customer Ratings</h6>

      <ul className="pl-1">
        {ratingFilters.map((ratingFilter, index) => {
          return (
            <li key={ratingFilter.rating}>
              <label className="flex align-center">
                <input
                  type="radio"
                  name="customer-rating"
                  value={ratingFilter}
                  className="mr-1"
                  onChange={() => {
                    dispatch({
                      type: "SORT_BY_RATING",
                      payload: ratingFilter.rating,
                    });
                  }}
                  checked={filters.rating === ratingFilter.rating}
                />
                {ratingFilter.rating}{" "}
                <i className="fas fa-star px-sm" title="star"></i> & above
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
