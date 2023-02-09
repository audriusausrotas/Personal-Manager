import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { todoDbActions } from "../../states/todo/database";

let check = true;

export default function TodoMain({ username }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (check) {
      fetch(`/api/todo?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          data.result.map((item) => {
            dispatch(todoDbActions.dbAdd(item));
          });
        });
      check = false;
    }
  }, [dispatch, username]);

  return (
    <div className="todo">
      <NewTodo username={username} />
      <TodoList />
    </div>
  );
}
