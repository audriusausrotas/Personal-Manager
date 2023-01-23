import { createSlice } from "@reduxjs/toolkit";

const loginState = {
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: loginState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
