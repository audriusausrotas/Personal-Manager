export default function AddButton({ openHandler, cancelHandler, isOpen }) {
  return (
    <div className="button filters__button">
      <div className="filters__button--text" onClick={openHandler}>
        {isOpen ? "Save Expense" : "New Expense"}
      </div>
      {isOpen && (
        <div className="filters__button--del" onClick={cancelHandler}>
          <div></div>
        </div>
      )}
    </div>
  );
}
