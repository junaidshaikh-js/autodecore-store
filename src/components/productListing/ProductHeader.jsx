export function ProductHeader({ name, soldBy, rating }) {
  return (
    <>
      <p className="txt-sm card-title">{name}</p>
      <small className="txt-secondary">{soldBy}</small>
      <div className="product-rating my-sm p-sm">
        {rating} <i className="fas fa-star"></i>
      </div>
    </>
  );
}
