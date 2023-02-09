import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { todoDbActions } from "../../states/todo/database";

export default function TodoList() {
  const db = useSelector((state) => state.todoDb.db);
  const selectedCategory = useSelector(
    (state) => state.todoFilters.selectedCategory
  );
  const selectedProgress = useSelector(
    (state) => state.todoFilters.selectedProgress
  );
  const dispatch = useDispatch();

  let filteredDB = db;

  if (selectedCategory !== "all")
    filteredDB = filteredDB.filter(
      (item) => item.category === selectedCategory
    );

  if (selectedProgress !== "all")
    filteredDB = filteredDB.filter(
      (item) => item.progress === selectedProgress
    );

  function deleteHandler(e) {
    fetch("/api/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemID: e.target.id }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(todoDbActions.dbRemove(e.target.id)));
  }

  function checkedHandler(e) {
    const checkedState = { itemID: e.target.id, checked: e.target.checked };
    fetch("/api/todo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkedState),
    })
      .then((response) => response.json())
      .then((data) => dispatch(todoDbActions.dbUpdate(checkedState)));
  }

  return (
    <div className="todoList">
      {filteredDB.map((item) => (
        <TodoItem
          key={item._id}
          deleteHandler={deleteHandler}
          item={item}
          checkedHandler={checkedHandler}
        />
      ))}
    </div>
  );
}
