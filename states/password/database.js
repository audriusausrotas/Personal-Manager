import { createSlice } from "@reduxjs/toolkit";

const dbState = {
  db: [],
};

const dbSlice = createSlice({
  name: "passwordDb",
  initialState: dbState,
  reducers: {
    dbAdd(state, action) {
      state.db.push(action.payload);
    },
    dbRemove(state, action) {
      state.db = state.db.filter((item) => item._id !== action.payload);
    },
    dbUpdate(state, action) {
      state.db.map((item) => {
        if (item._id === action.payload.itemID) {
          item.website = action.payload.website;
          item.user = action.payload.user;
          item.email = action.payload.email;
          item.password = action.payload.password;
        }
      });
    },
  },
});

export const passwordDbActions = dbSlice.actions;

export default dbSlice;
