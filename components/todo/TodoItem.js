export default function TodoItem({ item, deleteHandler }) {
  return (
    <div className="todoItem">
      <input className="todoItem__checkbox" type="checkbox" />
      <div className="todoItem__task">{item.task}</div>
      <button id={item._id} onClick={deleteHandler}>
        delete
      </button>
    </div>
  );
}
