export function ProductCardPrice({
  discountedPrice,
  originalPrice,
  discountPercent,
  cnames,
}) {
  return (
    <div className={"price-container my-1 " + cnames}>
      <span className="txt-md mr-sm txt-bold">₹{discountedPrice}</span>
      <span className="txt-strike-through txt-secondary mr-sm">
        ₹{originalPrice}
      </span>
      <span className="discount-percent">{discountPercent}% off</span>
    </div>
  );
}
