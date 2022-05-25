import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context";
import { ReactPortal } from "../../ReactPortal/ReactPortal";
import { SelectAddressModal } from "../../SelectAddressModal/SelectAddressModal";

export function ProductDeliverAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    state: { addresses },
  } = useAuth();

  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
  const currentAddress = addresses[currentAddressIndex] || null;

  return (
    <div className="py-1 border-bottom-dotted flex align-center justify-between">
      <div>
        <span className="txt-semibold">
          Deliver to:
          <span className="txt-semibold">{`${
            currentAddress?.name ? currentAddress.name : ""
          }`}</span>
        </span>

        {currentAddress ? (
          <address className="mt-1">
            {currentAddress.address}, {currentAddress.city},{" "}
            {currentAddress.state} - {currentAddress.pincode}
          </address>
        ) : (
          " No address found"
        )}
      </div>

      <div className="ml-2">
        {currentAddress ? (
          <button
            className="btn btn-complementary-outline"
            onClick={() => setIsModalOpen(true)}
          >
            Change
          </button>
        ) : (
          <Link to="/profile/addresses">
            <button className="btn btn-complementary-outline">
              Add address
            </button>
          </Link>
        )}
      </div>

      {isModalOpen && (
        <ReactPortal>
          <SelectAddressModal
            currentAddressIndex={currentAddressIndex}
            setCurrentAddressIndex={setCurrentAddressIndex}
            setIsModalOpen={setIsModalOpen}
          />
        </ReactPortal>
      )}
    </div>
  );
}
