import * as actionTypes from "../actions";

const initialState = { results: [] };

const reducer = (state = initialState, action) => {
  console.log("reducer: ", action.type);
  switch (action.type) {
    case actionTypes.STORE_NUMBER:
      console.log(" - ", state.results, action.result);
      // state.results.push(state.counter);
      return {
        ...state,
        results: state.results.concat([
          { id: new Date(), value: action.result }
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
