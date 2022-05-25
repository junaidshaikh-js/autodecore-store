import { useState } from "react";
import { useAuth } from "../../../context";
import { ReactPortal } from "../../ReactPortal/ReactPortal";
import { SelectAddressModal } from "../../SelectAddressModal/SelectAddressModal";

export function ProductDeliverAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    state: { addresses },
  } = useAuth();

  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
  const currentAddress = addresses[currentAddressIndex];

  return (
    <div className="py-1 border-bottom-dotted flex align-center justify-between">
      <div>
        <span>
          Deliver to:
          <span className="txt-semibold">{` ${currentAddress.name}`}</span>
        </span>

        <address className="mt-1">
          {currentAddress.address}, {currentAddress.city},{" "}
          {currentAddress.state} - {currentAddress.pincode}
        </address>
      </div>

      <div className="ml-2">
        <button
          className="btn btn-complementary-outline"
          onClick={() => setIsModalOpen(true)}
        >
          Change
        </button>
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
