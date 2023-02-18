export default function DeleteButton({ id, onClick }) {
  return (
    <div className="delete-button" onClick={onClick} id={id}>
      <div className="delete-button__X"></div>
    </div>
  );
}
