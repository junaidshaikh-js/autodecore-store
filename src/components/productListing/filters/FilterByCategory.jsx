import { useData } from "../../../context";

export function FilterByCategory({ dispatch, filters }) {
  const {
    state: { categories },
  } = useData();

  return (
    <section>
      <h6>Categories</h6>

      <ul className="pl-1">
        {categories.map((categoryObject) => {
          const category = categoryObject.categoryName;
          return (
            <li key={category}>
              <label className="flex align-center">
                <input
                  type="checkbox"
                  className="mr-1"
                  name={category.toLowerCase()}
                  value={category.toLocaleLowerCase()}
                  aria-label={category}
                  onChange={(e) => {
                    dispatch({
                      type: "FILTER_BY_CATEGORY",
                      payload: {
                        isChecked: e.target.checked,
                        value: e.target.value,
                      },
                    });
                  }}
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
