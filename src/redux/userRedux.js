import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    refreshToken: (state, action) => {
      state.currentUser.accessToken = action.payload.accessToken;
      state.currentUser.refreshToken = action.payload.refreshToken;
    },
  },
}); //End of Slice

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
  refreshToken,
} = userSlice.actions;
export default userSlice.reducer;
