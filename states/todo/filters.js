import { createSlice } from "@reduxjs/toolkit";

const filtersState = {
  categories: [],
  selectedCategory: "all",
  selectedProgress: "all",
};

const filtersSlice = createSlice({
  name: "todoFilters",
  initialState: filtersState,
  reducers: {
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    removeCategory(state, action) {
      state.categories = state.categories.filter(
        (item) => item !== action.payload
      );
    },
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setProgress(state, action) {
      state.selectedProgress = action.payload;
    },
  },
});

export const todoFiltersActions = filtersSlice.actions;

export default filtersSlice;
