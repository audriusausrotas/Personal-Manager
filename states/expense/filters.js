import { createSlice } from "@reduxjs/toolkit";

const today = new Date().toJSON().slice(0, 10);

const filtersState = {
  today: today,
  year: new Date(today).getFullYear().toString(),
  month: (new Date(today).getMonth() + 1).toString(),
  income: "all",
};

const filtersSlice = createSlice({
  name: "expenseFilter",
  initialState: filtersState,
  reducers: {
    year(state, action) {
      state.year = action.payload;
    },
    month(state, action) {
      state.month = action.payload;
    },
    income(state, action) {
      state.income = action.payload;
    },
  },
});

export const expenseFiltersActions = filtersSlice.actions;

export default filtersSlice;
