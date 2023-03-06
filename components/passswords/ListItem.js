import DeleteButton from "../components/deleteButton";

export default function ListItem({ id, website, clickHandler, deleteHandler }) {
  return (
    <div className="password__list-item">
      <li onClick={clickHandler}>{website}</li>
      <DeleteButton onClick={deleteHandler} id={id} />
    </div>
  );
}
