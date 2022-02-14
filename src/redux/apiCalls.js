import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutUser,
} from "./userRedux";

import { clearCart } from "./cartRedux";

import { publicRequest, userRequest } from "../requestMethods";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch, user, cart) => {
  try {
    const res = await userRequest.post("/auth/logout", user);
    dispatch(logoutUser(res.data));
    dispatch(clearCart);
  } catch (err) {}
};
