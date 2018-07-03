import * as actionTypes from "./actionTypes";
const initialState = { people: [] };
const reducer = (state = initialState, action) => {
  console.log(
    "reducer = ",
    action.type,
    " --- ",
    actionTypes.ADD_PERSON,
    state
  );
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      console.log(" action payload: ", action);
      return {
        ...state,
        people: state.people.concat([
          {
            id: Math.random() * 100,
            name: action.name,
            age: action.age
          }
        ])
      };
    case actionTypes.REMOVE_PERSON:
      return {
        ...state,
        people: state.people.filter(person => person.id !== action.id)
      };

    default:
      return state;
  }
};

export default reducer;
