import { createSlice } from "@reduxjs/toolkit";

const dbState = {
  db: [],
};

const dbSlice = createSlice({
  name: "expenseDb",
  initialState: dbState,
  reducers: {
    dbAdd(state, action) {
      state.db.push(action.payload);
    },
    dbRemove(state, action) {
      state.db = state.db.filter((item) => item._id !== action.payload);
    },
  },
});

export const expenseDbActions = dbSlice.actions;

export default dbSlice;
