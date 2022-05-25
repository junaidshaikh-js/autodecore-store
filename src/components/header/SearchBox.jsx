import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useData } from "../../context";
import { SearchList } from "../SearchList/SearchList";

export function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    state: { products },
  } = useData();
  const location = useLocation();

  useEffect(() => {
    setSearchTerm("");
  }, [location]);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (searchTerm) {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="hy-search-box">
      <input
        type="search"
        placeholder="Search for producs, brands and more.."
        value={searchTerm}
        onChange={handleSearchTerm}
      />

      <button className="btn hy-search-btn" type="submit">
        <i className="fas fa-search" title="search"></i>
      </button>

      {searchTerm && (
        <SearchList
          filteredProducts={filteredProducts}
          setSearchTerm={setSearchTerm}
        />
      )}
    </div>
  );
}
