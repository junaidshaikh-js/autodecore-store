import { getValidated } from "./getValidated";

export function handleSignupSubmit(e, signupValues, setSignupErrors) {
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
    // TODO: make signup request
    console.log("signing user");
  }

  setSignupErrors(errors);
}
