import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "./general/login";
import expenseDatabase from "./expense/database";
import expenseFilters from "./expense/filters";
import todoDatabase from "./todo/database";
import todoFilters from "./todo/filters";
import notesDatabase from "./notes/database";
import passwordDatabase from "./password/database";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    todoDb: todoDatabase.reducer,
    todoFilters: todoFilters.reducer,
    expenseDb: expenseDatabase.reducer,
    expenseFilters: expenseFilters.reducer,
    notesDb: notesDatabase.reducer,
    passwordDb: passwordDatabase.reducer,
  },
});

export default store;
