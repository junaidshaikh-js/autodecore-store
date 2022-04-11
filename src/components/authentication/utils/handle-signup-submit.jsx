import { getValidated } from "./getValidated";
import { signup } from "../../../utils";

export function handleSignupSubmit(
  e,
  signupValues,
  setSignupErrors,
  setIsLoading,
  dispatch,
  navigate,
  setToastMessage
) {
  e.preventDefault();

  const { email, password, confirmPassword, firstName, lastName } =
    signupValues;

  const errors = getValidated(
    email,
    password,
    confirmPassword,
    firstName,
    lastName
  );

  if (!Object.keys(errors).length) {
    signup(
      email,
      password,
      firstName,
      lastName,
      dispatch,
      setIsLoading,
      navigate,
      setToastMessage
    );
  }

  setSignupErrors(errors);
}
