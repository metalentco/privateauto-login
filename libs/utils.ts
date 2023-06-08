export const checkCharacterNumber = (str: string) => {
  return str.length > 7;
};

export const checkSpecialCharacter = (str: string) => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  return regex.test(str);
};

export const checkUpperLower = (str: string) => {
  return str.match(/[a-z]/) && str.match(/[A-Z]/);
};

export const checkNumber = (str: string) => {
  return str.match(/\d+/);
};

export const checkEmail = (email: string) => {
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(email);
};
