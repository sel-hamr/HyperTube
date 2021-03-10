import validate from 'validator';
const Validator = function (key, value) {
  if (validate.isEmpty(value)) return false;
  const objectKeys = {
    email: validate.isEmail(value) && validate.isLength(value, { max: 100 }),
    userName: validate.isAlphanumeric(value) && validate.isLength(value, { min: 4, max: 40 }),
    lastName: validate.isAlpha(value) && validate.isLength(value, { max: 25 }),
    firstName: validate.isAlpha(value) && validate.isLength(value, { max: 25 }),
    password:
      validate.isStrongPassword(value, {
        minLength: 8,
        returnScore: true,
      }) > 35 && validate.isLength(value, { max: 100 }),
  };
  return objectKeys[key] ? true : false;
};
export { Validator };
