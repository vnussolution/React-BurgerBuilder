import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = { results: [] };

const resultReducer = (state = initialState, action) => {
  console.log("reducer: ", action.type);
  switch (action.type) {
    case actionTypes.STORE_NUMBER:
      console.log(" - ", state.results, action.result);
      return updateObject(state, {
        results: state.results.concat([
          { id: new Date(), value: action.result }
        ])
      });

    case actionTypes.DELETE_STORE_NUMBER:
      return updateObject(state, {
        results: state.results.filter(result => result.id !== action.id)
      });
    default:
      return state;
  }
};

export default resultReducer;
