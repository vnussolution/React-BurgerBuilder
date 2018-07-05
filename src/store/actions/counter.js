import * as actionTypes from "./actionTypes";

export const increment = () => {
  return { type: actionTypes.INCREMENT };
};

export const decrement = () => {
  return { type: actionTypes.DECREMENT };
};
export const add_five = val => {
  return { type: actionTypes.ADDFIVE, val };
};
export const substract_five = val => {
  return { type: actionTypes.SUBSTRACT_FIVE, val };
};
