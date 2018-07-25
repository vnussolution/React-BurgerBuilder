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

export const purchaseBurgerAsync = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    setTimeout(() => {
      axios
        .post("/orders.json?auth=" + token, orderData)
        .then(response => {
          dispatch(purchaseBurger(response.data.name, orderData));
        })
        .catch(error => {
          dispatch(purchaseBurgerFailed(error));
        });
    }, 1111);
  };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const fetchOrderStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};

export const fetchOrder = orders => {
  return { type: actionTypes.FETCH_ORDERS_OK, fetchedOrders: orders };
};

export const fetchOrderFailed = error => {
  return { type: actionTypes.FETCH_ORDERS_FAILED, error: error };
};

export const fetchOrdersAsync = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    const params = `${token}&orderBy="userId"&equalTo="${userId}"`;

    setTimeout(() => {
      axios
        .get("/orders.json?auth=" + params)
        .then(res => {
          const fetchOrders = [];
          for (let key in res.data) {
            fetchOrders.push({ ...res.data[key], key: key });
          }
          dispatch(fetchOrder(fetchOrders));
        })
        .catch(err => {
          dispatch(fetchOrderFailed(err));
        });
    }, 1111);
  };
};

export const deleteOrderStart = () => {
  return { type: actionTypes.DELETE_ORDER_START };
};

export const deleteOrder = id => {
  return { type: actionTypes.DELETE_ORDER_OK, id: id };
};

export const deleteOrderFailed = error => {
  return { type: actionTypes.DELETE_ORDER_FAILED, error: error };
};

export const deleteOrdersAsync = id => {
  return dispatch => {
    dispatch(deleteOrderStart());
    setTimeout(() => {
      axios
        .delete("/orders.json/", { params: { key: id } })
        .then(res => {
          dispatch(deleteOrder(id));
        })
        .catch(err => {
          dispatch(deleteOrderFailed(err));
        });
    }, 1111);
  };
};
