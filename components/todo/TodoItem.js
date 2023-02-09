export default function TodoItem({ item, deleteHandler, checkedHandler }) {
  return (
    <div className="todoItem">
      <input
        className={`todoItem__checkbox ${
          item.progress === "finished" && "checked"
        }`}
        type="checkbox"
        onChange={checkedHandler}
        id={item._id}
        checked={item.progress === "finished" ? "checked" : ""}
      />
      <div className="todoItem__task">{item.task}</div>
      <div className="todoItem__category">{item.category}</div>
      <button id={item._id} onClick={deleteHandler}>
        delete
      </button>
    </div>
  );
}
