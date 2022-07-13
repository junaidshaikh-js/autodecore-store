import produce from "immer";

export const authReducer = produce((state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      state.token = payload.encodedToken;
      state.userName = payload.foundUser?.firstName;
      state.addresses = payload.foundUser?.addresses;
      break;

    case "LOG_OUT":
      state.token = payload.token;
      state.userName = payload.userName;
      break;

    case "ADD_ADDRESS":
      state.addresses.push(payload);
      break;

    case "DELETE_ADDRESS":
    case "UPDATE_ADDRESS":
      state.addresses = payload;
      break;

    default:
      throw new Error("Unhandled type in auth reducer");
  }
});
