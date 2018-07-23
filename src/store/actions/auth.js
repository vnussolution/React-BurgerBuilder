import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authenticateStart = () => {
  return { type: actionTypes.AUTHENTICATE_START };
};

export const authenticateOk = (token, id) => {
  return { type: actionTypes.AUTHENTICATE_OK, idToken: token, userId: id };
};

export const authenticateFailed = error => {
  return { type: actionTypes.AUTHENTICATE_FAILED, error: error };
};

export const logout = () => {
  return { type: actionTypes.AUTHENTICATE_LOGOUT };
};

export const authenticateTimeoutAsync = expireTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expireTime * 1000);
  };
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
    setTimeout(() => {
      axios
        .post(url, payload)
        .then(response => {
          console.log(" new user: ", response);
          dispatch(
            authenticateOk(response.data.idToken, response.data.localId)
          );
          dispatch(authenticateTimeoutAsync(response.data.expiresIn));
        })
        .catch(err => {
          dispatch(authenticateFailed(err.response.data.error));
        });
    }, 1111);
  };
};
