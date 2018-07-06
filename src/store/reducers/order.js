import * as actionTypes from "../actions/actionTypes";

const initialState = { loading: false, orders: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_OK:
      const newOrder = { ...action.orderData, id: action.orderId };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
