export function PriceDetailsRow({ title, titleState, value, valueclass }) {
  return (
    <div className="flex justify-between my-sm">
      <span>
        {title} {titleState && <span>({titleState})</span>}
      </span>

      <span className={valueclass}>{value}</span>
    </div>
  );
}
