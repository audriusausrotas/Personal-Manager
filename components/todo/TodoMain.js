import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { todoDbActions } from "../../states/todo/database";
import { todoFiltersActions } from "../../states/todo/filters";

let check = true;

export default function TodoMain({ username }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (check) {
      fetch(`/api/todo?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          const categories = [];
          data.result.map((item) => {
            dispatch(todoDbActions.dbAdd(item));
            !categories.includes(item.category) &&
              categories.push(item.category);
          });
          categories.map((item) => {
            dispatch(todoFiltersActions.addCategory(item));
          });
        });
      check = false;
    }
  }, [dispatch, username]);

  return (
    <div className="todo">
      <NewTodo username={username} />
      <TodoFilters />
      <TodoList />
    </div>
  );
}
