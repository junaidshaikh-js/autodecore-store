export function authReducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        token: payload.encodedToken,
        userName: payload.foundUser?.firstName,
        addresses: payload.foundUser?.addresses,
      };
    case "LOG_OUT":
      return {
        ...state,
        token: payload.token,
        userName: payload.userName,
      };
    case "ADD_ADDRESS":
      return {
        ...state,
        addresses: [...state.addresses, payload],
      };
    case "DELETE_ADDRESS":
    case "UPDATE_ADDRESS":
      return {
        ...state,
        addresses: payload,
      };
    default:
      throw new Error("Unhandled type in auth reducer");
  }
}
