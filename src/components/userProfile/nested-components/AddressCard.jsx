import { useAuth, useToast } from "../../../context";
import { deleteAddress } from "../../../utils/server-requests";

export function AddressCard({
  name,
  mobileNo,
  address,
  city,
  state,
  pincode,
  id,
  tag,
  setIsEditing,
  setEditFormValues,
  index,
  setNewAddress,
}) {
  const {
    state: { addresses },
    dispatch: authDispatch,
  } = useAuth();

  const { setToastMessage } = useToast();

  return (
    <article className="address-box p-1 my-1">
      <span className="address-tag p-sm">{tag}</span>
      <div className="flex txt-semibold">
        <p>{name}</p>
        <p className="ml-1">{mobileNo}</p>
      </div>
      <address>
        {address}, {city}, {state} - {pincode}
      </address>
      <button
        className="btn btn-secondary mt-1"
        onClick={() => {
          setEditFormValues(addresses[index]);
          setNewAddress(false);
          setIsEditing({ index: index });
        }}
      >
        Edit
      </button>
      <button
        className="btn btn-secondary mt-1 ml-1"
        onClick={() =>
          deleteAddress(id, addresses, authDispatch, setToastMessage)
        }
      >
        Delete
      </button>
    </article>
  );
}
