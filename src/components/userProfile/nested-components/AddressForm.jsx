const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

export function AddressForm({
  values,
  handleChange,
  onCancleClick,
  handleSubmit,
  isEditing,
  setFormValues,
}) {
  const handleFillDummyValues = () => {
    setFormValues((f) => ({
      ...f,
      name: "Abhishek Sharma",
      mobileNo: "02228513253",
      pincode: "400072",
      address: "No.2, S D Road",
      city: "Hyderabad",
      state: "Andhra Pradesh",
      tag: "Work",
    }));
  };

  return (
    <section className="form-bg p-1 my-1">
      <p className="h5 color-primary p-1">
        {isEditing ? "EDIT ADDRESSS" : "ADD A NEW ADDRESS"}
      </p>
      <form
        className="address-form px-sm"
        onSubmit={(e) => handleSubmit(e, values)}
      >
        <div className="form-row">
          <HiddenLabel forValue="name" label="Name" />
          <FormInputField
            type="text"
            placeholder="Name"
            id="name"
            handleChange={handleChange}
            name="name"
            value={values.name}
          />
        </div>

        <div className="form-row">
          <HiddenLabel forValue="mobile-no" label="Mobile No" />
          <FormInputField
            type="tel"
            placeholder="10-digit mobile number"
            id="mobile-no"
            name="mobileNo"
            handleChange={handleChange}
            value={values.mobileNo}
            maxLength="10"
          />
        </div>

        <div className="form-row">
          <HiddenLabel forValue="pincode" label="Pincode" />
          <FormInputField
            type="number"
            placeholder="Pincode"
            id="pincode"
            name="pincode"
            handleChange={handleChange}
            value={values.pincode}
            maxLength="6"
          />
        </div>

        <div className="form-row">
          <HiddenLabel forValue="address" label="Address" />
          <textarea
            id="address"
            cols="30"
            rows="10"
            className="w-100 p-sm border-sm"
            placeholder="Address(Area and Street)"
            name="address"
            onChange={handleChange}
            value={values.address}
          ></textarea>
        </div>

        <div className="form-row">
          <HiddenLabel forValue="city" label="City District Town" />
          <FormInputField
            type="text"
            placeholder="City/District/Town"
            id="city"
            name="city"
            handleChange={handleChange}
            value={values.city}
          />
        </div>

        <div className="form-row">
          <HiddenLabel forValue="tag" label="Tag" />
          <FormInputField
            type="text"
            placeholder="Tag"
            id="tag"
            name="tag"
            handleChange={handleChange}
            value={values.tag}
          />
        </div>

        <div className="form-row">
          <HiddenLabel forValue="state" label="Select State" />
          <select
            name="state"
            id="state"
            className="form-field my-sm p-sm border-sm w-100"
            value={values.state}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select State
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-column address-form-btns">
          <button type="submit" className="btn btn-primary my-sm">
            Save
          </button>
          {!isEditing && (
            <button
              className="btn btn-complementary my-sm"
              type="button"
              onClick={handleFillDummyValues}
            >
              Fill Dummy Values
            </button>
          )}
          <button
            type="button"
            className="btn my-sm"
            onClick={() => onCancleClick({ index: -1 })}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

function HiddenLabel({ forValue, label }) {
  return (
    <label htmlFor={forValue} className="visually-hidden">
      {label}
    </label>
  );
}

function FormInputField({
  type,
  placeholder,
  id,
  name,
  value,
  handleChange,
  maxLength,
}) {
  return (
    <input
      type={type}
      className="form-field my-sm p-sm border-sm w-100"
      placeholder={placeholder}
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
      required
    />
  );
}
