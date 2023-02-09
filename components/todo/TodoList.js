import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { todoDbActions } from "../../states/todo/database";

export default function TodoList() {
  const db = useSelector((state) => state.todoDb.db);
  const dispatch = useDispatch();

  function deleteHandler(e) {
    fetch("/api/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemID: e.target.id }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(todoDbActions.dbRemove(e.target.id)));
  }

  return (
    <div className="todoList">
      {db.map((item) => (
        <TodoItem key={item._id} deleteHandler={deleteHandler} item={item} />
      ))}
    </div>
  );
}
