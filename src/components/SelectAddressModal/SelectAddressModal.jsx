import { useAuth } from "../../context";
import "./selectAddressModal.css";

export const SelectAddressModal = ({
  currentAddressIndex,
  setCurrentAddressIndex,
  setIsModalOpen,
}) => {
  const {
    state: { addresses },
  } = useAuth();

  return (
    <div className="modal-wrapper flex flex-center">
      <article className="bg-white p-1">
        {addresses.map(
          ({ tag, name, address, city, state, pincode }, index) => {
            return (
              <div className="flex align-center my-1">
                <input
                  type="radio"
                  className="address-radio-btn mr-1"
                  name="address"
                  aria-label="Select Address"
                  checked={index == currentAddressIndex}
                  onChange={() => {
                    setCurrentAddressIndex(index);
                    setIsModalOpen(false);
                  }}
                />

                <div>
                  <div className="flex txt-semibold">
                    <p>{name} - </p>
                    <span className="address-tag p-sm align-self-center ml-sm">
                      {tag}
                    </span>
                  </div>
                  <address>
                    {address}, {city}, {state} - {pincode}
                  </address>
                </div>
              </div>
            );
          }
        )}
      </article>
    </div>
  );
};
