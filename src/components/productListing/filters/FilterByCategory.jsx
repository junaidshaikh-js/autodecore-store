export function FilterByCategory({ dispatch, filters }) {
  const categories = [
    "Car Mats",
    "Car Tyres",
    "Vehicle Cleaners",
    "Car Lighting",
    "Car Covers",
    "Glass Cleaner",
    "Pressure Washer",
    "Air Purifiers",
    "Vacuum Cleaner",
  ];

  return (
    <section>
      <h6>Categories</h6>

      <ul className="pl-1">
        {categories.map((category) => {
          return (
            <li key={category}>
              <label className="flex align-center">
                <input
                  type="checkbox"
                  className="mr-1"
                  name={category.toLowerCase()}
                  value={category.toLocaleLowerCase()}
                  aria-label={category}
                  checked={filters.categories.includes(category.toLowerCase())}
                />
                {category}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
