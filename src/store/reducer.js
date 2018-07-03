import * as actionTypes from "./actionTypes";
const initialState = { people: [] };
const reducer = (state = initialState, action) => {
  console.log("reducer = ", action.type, " --- ", actionTypes.ADD_PERSON);
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      return {
        ...state,
        people: state.people.concat([
          { age: Math.random() * 100, name: "frankie" }
        ])
      };

    default:
      return state;
  }
};

export default reducer;
