export function authReducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        token: payload.encodedToken,
        userName: payload.foundUser?.firstName,
      };
    default:
      throw new Error("Unhandled type in auth reducer");
  }
}
