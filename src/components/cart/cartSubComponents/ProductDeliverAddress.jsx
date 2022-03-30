export function ProductDeliverAddress() {
  return (
    <div className="py-1 border-bottom-dotted flex align-center justify-between">
      <div>
        <span>
          Deliver to:
          <span className="txt-semibold">Junaid Shaikh</span>
        </span>

        <address className="mt-1">
          #916 Water St, Ketchikan, Alaska 99901, USA
        </address>
      </div>

      <div className="ml-2">
        <button className="btn btn-complementary-outline">Change</button>
      </div>
    </div>
  );
}
