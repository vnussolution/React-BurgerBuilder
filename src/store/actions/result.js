import * as actionTypes from "./actionTypes";

export const store_number = result => {
  return { type: actionTypes.STORE_NUMBER, result };
};

export const store_number_async = result => {
  return dispatch => {
    setTimeout(() => {
      dispatch(store_number(result));
    }, 2000);
  };
};
export const delete_store_number = id => {
  return { type: actionTypes.DELETE_STORE_NUMBER, id };
};

export const delete_store_number_async = id => {
  return dispatch => {
    setTimeout(() => {
      dispatch(delete_store_number(id));
    }, 2000);
  };
};
