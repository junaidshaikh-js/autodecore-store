import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAuth, useToast } from "../../../context";

import { AddressForm } from "./AddressForm";
import { AddressList } from "./AddressList";
import { addAddress } from "../../../utils/server-requests";

export const Addresses = () => {
  const initialFormValues = {
    name: "",
    mobileNo: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    tag: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [newAddress, setNewAddress] = useState(false);
  const [isEditing, setIsEditing] = useState({
    index: -1,
  });

  const { dispatch: authDispatch } = useAuth();

  const { setToastMessage } = useToast();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues((f) => {
      return { ...f, [name]: value };
    });
  }

  function handleSubmit(e, values) {
    e.preventDefault();

    if (values.pincode.length > 6) {
      setToastMessage({
        type: "error",
        message: "pincode should be 6 character long",
      });
      return;
    }

    addAddress(values, authDispatch, setToastMessage);

    setNewAddress(false);
    setFormValues(initialFormValues);
  }

  function handleCancleForm() {
    setNewAddress(false);
    setFormValues(initialFormValues);
  }

  return (
    <section className="profile-component bg-white m-1 p-1 flex-grow">
      <div>
        <h3>Manage Address</h3>

        {newAddress ? (
          <AddressForm
            onCancleClick={handleCancleForm}
            handleChange={handleChange}
            values={formValues}
            handleSubmit={handleSubmit}
            setFormValues={setFormValues}
          />
        ) : (
          <button
            className="btn color-primary border-gray w-100 txt-left flex align-center"
            onClick={() => {
              setNewAddress(true);
              setIsEditing({ index: -1 });
              setFormValues(initialFormValues);
            }}
          >
            <FaPlus />
            <span className="ml-1">ADD A NEW ADDRESS</span>
          </button>
        )}
      </div>

      <AddressList
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setNewAddress={setNewAddress}
      />
    </section>
  );
};
