export function authReducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        token: payload.encodedToken,
        userName: payload.foundUser?.firstName,
      };
    case "LOG_OUT":
      return {
        ...state,
        token: payload.token,
        userName: payload.userName,
      };
    default:
      throw new Error("Unhandled type in auth reducer");
  }
}
