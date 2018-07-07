import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurger = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_OK,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurgerFailed = error => {
  return { type: actionTypes.PURCHASE_BURGER_FAILED, error: error };
};

export const purchaseBurgerAsync = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    setTimeout(() => {
      axios
        .post("/orders.json", orderData)
        .then(response => {
          dispatch(purchaseBurger(response.data, orderData));
        })
        .catch(error => {
          dispatch(purchaseBurgerFailed(error));
        });
    }, 2222);
  };
};
