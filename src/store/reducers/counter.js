import * as actionTypes from "../actions";

const initialState = { counter: 0, results: [] };

const counterReducer = (state = initialState, action) => {
  console.log("reducer: ", action.type);
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case actionTypes.DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case actionTypes.ADDFIVE:
      return { ...state, counter: state.counter + action.val };
    case actionTypes.SUBSTRACT_FIVE:
      return { ...state, counter: state.counter - action.val };
    default:
      return state;
  }
};

export default counterReducer;
