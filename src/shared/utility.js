export const checkValidity = (identifier, value, rules) => {
  let isValid = true;
  let message = "";

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    if (!isValid) {
      message += `${identifier} is required. `;
    }
  }

  if (rules.minLength) {
    isValid = value.length > rules.minLength && isValid;
    if (value.length < rules.minLength) {
      message += `${identifier}'s minLength is ${rules.minLength}. `;
    }
  }

  if (rules.maxLength) {
    isValid = value.length < rules.maxLength && isValid;
    if (value.length > rules.maxLength) {
      message += `${identifier}'s maxLength is ${rules.maxLength}.`;
    }
  }

  if (rules.isEmail) {
    // isValid = value.length < rules.maxLength && isValid;
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
    if (!isValid) {
      message += ` ${identifier} is not correct`;
    }
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
    if (!isValid) {
      message += ` ${identifier} is not a number`;
    }
  }
  return message;
};
