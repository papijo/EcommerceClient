import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutUser,
  refreshToken,
} from "./userRedux";
import jwt_decode from "jwt-decode";

import { clearCart } from "./cartRedux";

import { publicRequest } from "../requestMethods";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    window.location.reload();
    //Console.log data
    console.log(res.data.accessToken);
    //Pass AccessToken to LocalStorage Manually using the setItem method
  } catch (err) {
    dispatch(loginFailure());
    console.log(err);
  }
};

export const logout = async (dispatch, user, cart) => {
  try {
    const res = await publicRequest.post("/auth/logout", user);
    dispatch(logoutUser(res.data));
    dispatch(clearCart);
  } catch (err) {}
};

export const refresh = async (dispatch) => {
  // window.location.reload();
  const res = await publicRequest.post("/users/refresh");
  dispatch(refreshToken(res.data));

  return res.data;
};
