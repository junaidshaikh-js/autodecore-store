export const getValidated = (
  email,
  password,
  confirmPassword,
  firstName,
  lastName
) => {
  const testEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const errors = {};

  if (firstName == "") {
    errorUpdate("firstName", "Enter first name");
  }
  if (lastName == "") {
    errorUpdate("lastName", "Enter last name");
  }
  if (!testEmail || email == "") {
    errorUpdate("email", "Invalid email");
  }
  if (password == "") {
    errorUpdate("password", "Invalid password");
  }
  if (confirmPassword == "") {
    errorUpdate("confirmPassword", "Invalid password");
  } else if (confirmPassword && password != confirmPassword) {
    errorUpdate("confirmPassword", "password doesn't match");
  }

  function errorUpdate(key, value) {
    errors[key] = value;
  }

  return errors;
};
