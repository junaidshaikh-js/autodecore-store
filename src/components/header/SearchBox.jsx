export function SearchBox() {
  return (
    <div className="hy-search-box">
      <input
        type="search"
        placeholder="Search for producs, brands and more.."
      />

      <button className="btn hy-search-btn" type="submit">
        <i className="fas fa-search" title="search"></i>
      </button>
    </div>
  );
}
