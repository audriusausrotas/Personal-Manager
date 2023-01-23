export default function IncomeSwitch({ income, incomeHandler }) {
  return (
    <div className="switch">
      <div className="switch__labels switch__labels-income">income</div>
      <div
        onClick={incomeHandler}
        className={
          income === "income"
            ? "switch__toggle switch__toggle--on"
            : "switch__toggle switch__toggle--off"
        }
      >
        <div className="switch__toggle-button"></div>
      </div>
      <div className="switch__labels switch__labels-expense">expense</div>
    </div>
  );
}
