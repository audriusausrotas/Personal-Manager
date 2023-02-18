import DeleteButton from "../../components/deleteButton";

export default function AddButton({ openHandler, cancelHandler, isOpen }) {
  return (
    <div className="filters__button" onClick={openHandler}>
      <div className="filters__button--text">
        {isOpen ? "Save Expense" : "New Expense"}
      </div>
      {isOpen && (
        <div className="filters__button--color" onClick={cancelHandler}>
          <DeleteButton className="delete-button" />
        </div>
      )}
    </div>
  );
}
