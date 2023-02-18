import DeleteButton from "../components/deleteButton";
import { todoDbActions } from "../../states/todo/database";
import { expenseDbActions } from "../../states/expense/database";
import { useDispatch } from "react-redux";

export default function ListItem({ item }) {
  const dispatch = useDispatch();

  function deleteHandler(e) {
    fetch(`/api/${item.date ? "expense" : "todo"}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemID: e.target.id }),
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch(
          item.date
            ? expenseDbActions.dbRemove(e.target.id)
            : todoDbActions.dbRemove(e.target.id)
        )
      );
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
    <div
      className={`list-item ${
        item.income === "income" ? "list-item__true" : "list-item__false"
      }`}
    >
      {item.date && <div className="">{item.date}</div>}
      {item.progress && (
        <input
          className={`list-item__checkbox ${
            item.progress === "finished" ? "checked" : ""
          }`}
          type="checkbox"
          onChange={checkedHandler}
          id={item._id}
          checked={item.progress === "finished" ? "checked" : ""}
        />
      )}
      <div className="list-item__content">
        {item.description ? item.description : item.task}
      </div>
      <div className=""> {item.price ? item.price + "€" : item.category} </div>
      <DeleteButton id={item._id} onClick={deleteHandler}>
        delete
      </DeleteButton>
    </div>
  );
}
