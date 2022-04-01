export const getValidated = (email, password) => {
  const testEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  if (!testEmail) return false;

  if (password == "") return false;

  return true;
};
