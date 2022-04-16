import { Link } from "react-router-dom";
import "./search-list.css";

export const SearchList = ({ filteredProducts, setSearchTerm }) => {
  const handleClick = () => {
    setSearchTerm("");
  };

  return (
    <div className="search-list p-1" onClick={handleClick}>
      {filteredProducts.length == 0 ? (
        <small>No products available</small>
      ) : (
        filteredProducts?.map(({ image, name, soldBy, productId }) => {
          return (
            <Link to={`/product/${productId}`}>
              <div className="flex my-1 border-bottom pb-sm">
                <figure className="search-card-image mr-1">
                  <img src={image[0]} alt="" />
                </figure>
                <div className="flex flex-column">
                  <span className="search-card-title txt-sm mb-sm">{name}</span>
                  <span className="txt-secondary txt-sm">{soldBy}</span>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};
