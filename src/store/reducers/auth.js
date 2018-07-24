import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_FAILED:
      return { ...state, error: action.error, loading: false };

    case actionTypes.AUTHENTICATE_OK:
      return {
        ...state,
        loading: false,
        token: action.idToken,
        userId: action.userId,
        error: null
      };

    case actionTypes.AUTHENTICATE_START:
      return { ...state, loading: true, error: null };

    case actionTypes.AUTHENTICATE_LOGOUT:
      return { ...state, token: null, userId: null };

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return { ...state, authRedirectPath: action.path };

    default:
      return { ...state, loading: false };
  }
};

export default reducer;
