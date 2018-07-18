import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  orders: [],
  purchased: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_ORDER_FAILED:
      return { ...state, loading: false };
    case actionTypes.DELETE_ORDER_START:
      return { ...state, loading: true };
    case actionTypes.DELETE_ORDER_OK:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter(o => o.key !== action.id)
      };

    case actionTypes.FETCH_ORDERS_FAILED:
      return { ...state, loading: false };
    case actionTypes.FETCH_ORDERS_START:
      return { ...state, loading: true };
    case actionTypes.FETCH_ORDERS_OK:
      return { ...state, loading: false, orders: action.fetchedOrders };
    case actionTypes.PURCHASE_INIT:
      return { ...state, purchased: false };
    case actionTypes.PURCHASE_BURGER_START:
      return { ...state, loading: true };
    case actionTypes.PURCHASE_BURGER_OK:
      const newOrder = { ...action.orderData, id: action.orderId };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
