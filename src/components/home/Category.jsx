import { Link } from "react-router-dom";
import { useStateContext } from "../../context";

export function Category({ categoryName, sources }) {
  const { dispatch } = useStateContext();
  return (
    <div className="bg-white my-1">
      <section className="category-section  txt-center p-sm pb-1 ">
        <header className="py-1">
          <h2 className="h3">{categoryName}</h2>
        </header>

        <div className="category-container gap-1 m-sm">
          {sources.map(({ categoryName, image }) => {
            return (
              <Link to="/products" key={categoryName}>
                <figure
                  key={categoryName}
                  onClick={() => {
                    dispatch({
                      type: "FILTER_BY_CATEGORY",
                      payload: {
                        isChecked: true,
                        value: categoryName.toLowerCase(),
                      },
                    });
                  }}
                >
                  <img src={image} alt={categoryName} />
                </figure>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
