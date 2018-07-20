import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authenticateStart = () => {
  return { type: actionTypes.AUTHENTICATE_START };
};

export const authenticateOk = data => {
  return { type: actionTypes.AUTHENTICATE_OK, auth: data };
};

export const authenticateFailed = error => {
  return { type: actionTypes.AUTHENTICATE_FAILED, errror: error };
};

export const authenticateAsync = (email, password, newUser) => {
  return dispatch => {
    dispatch(authenticateStart());
    const payload = { email, password, returnSecureToken: true };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCmI1Kg_nLZK7A2pkMM3PslRtbFzXFIhZw";

    if (newUser) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCmI1Kg_nLZK7A2pkMM3PslRtbFzXFIhZw";
    }
    axios
      .post(payload)
      .then(response => {
        console.log(" new user: ", response);
        dispatch(authenticateOk(response));
      })
      .catch(err => {
        dispatch(authenticateFailed(err));
      });
  };
};
