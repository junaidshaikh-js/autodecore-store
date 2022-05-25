import { useState } from "react";
import { AddressCard } from "./AddressCard";
import { AddressForm } from "./AddressForm";
import { useAuth, useToast } from "../../../context";
import { editAddress } from "../../../utils/server-requests";

export function AddressList({ isEditing, setIsEditing, setNewAddress }) {
  const [editFormValues, setEditFormValues] = useState({});

  const {
    state: { addresses },
    dispatch: authDispatch,
  } = useAuth();

  const { setToastMessage } = useToast();

  function handleEditChange(e) {
    const { name, value } = e.target;

    setEditFormValues((f) => {
      return { ...f, [name]: value };
    });
  }

  function handleEditSubmit(e, id, values) {
    e.preventDefault();

    editAddress(
      id,
      addresses,
      authDispatch,
      values,
      setToastMessage,
      setIsEditing
    );
  }

  return (
    <section>
      {addresses.map((address, index) => {
        if (isEditing.index === index) {
          return (
            <AddressForm
              key={address.id}
              id={address.id}
              values={editFormValues}
              onCancleClick={setIsEditing}
              isEditing={true}
              handleSubmit={(e, values) =>
                handleEditSubmit(e, address.id, values)
              }
              handleChange={handleEditChange}
            />
          );
        }

        return (
          <AddressCard
            key={address.id}
            {...address}
            setIsEditing={setIsEditing}
            index={index}
            setEditFormValues={setEditFormValues}
            setNewAddress={setNewAddress}
          />
        );
      })}
    </section>
  );
}
