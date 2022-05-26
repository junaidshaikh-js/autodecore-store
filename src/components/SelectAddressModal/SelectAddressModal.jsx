import { useAuth } from "../../context";
import { useEscape } from "../../hooks";
import "./selectAddressModal.css";

export const SelectAddressModal = ({
  currentAddressIndex,
  setCurrentAddressIndex,
  setIsModalOpen,
}) => {
  const {
    state: { addresses },
  } = useAuth();

  useEscape(setIsModalOpen);

  return (
    <div
      className="modal-wrapper flex flex-center"
      onClick={() => setIsModalOpen(false)}
    >
      <article
        className="bg-white p-1 mx-1"
        onClick={(e) => e.stopPropagation()}
      >
        {addresses.map(
          ({ id, tag, name, address, city, state, pincode }, index) => {
            return (
              <div className="flex align-center my-1" key={id}>
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
