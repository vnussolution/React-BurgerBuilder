import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
  };
  const authenticatedState = {
    token: "some-token",
    userId: "user-id",
    error: null,
    loading: false,
    authRedirectPath: "/"
  };
  const authOK = {
    type: actionTypes.AUTHENTICATE_OK,
    idToken: "some-token",
    userId: "user-id"
  };
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should return the initial state", () => {
    expect(reducer(initialState, authOK)).toEqual(authenticatedState);
  });
});
