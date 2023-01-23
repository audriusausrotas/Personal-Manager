import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "./general/login";
import expenseDatabase from "./expense/database";
import expenseFilters from "./expense/filters";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,

    expenseDb: expenseDatabase.reducer,
    expenseFilters: expenseFilters.reducer,
  },
});

export default store;
