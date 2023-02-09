import { createSlice } from "@reduxjs/toolkit";

const dbState = {
  db: [],
};

const dbSlice = createSlice({
  name: "todoDb",
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
          item.progress = action.payload.checked ? "finished" : "active";
        }
      });
    },
  },
});

export const todoDbActions = dbSlice.actions;

export default dbSlice;
