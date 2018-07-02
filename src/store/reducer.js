import * as actionTypes from "./actions";

const initialState = { counter: 0, results: [] };

const reducer = (state = initialState, action) => {
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

    case actionTypes.STORE_NUMBER:
      console.log(" - ", state.results);
      // state.results.push(state.counter);
      return {
        ...state,
        results: state.results.concat([
          { id: new Date(), value: state.counter }
        ])
      };

    case actionTypes.DELETE_STORE_NUMBER:
      return {
        ...state,
        results: state.results.filter(result => result.id !== action.id)
      };
    default:
      return state;
  }
};

export default reducer;
