import { useDispatch, useSelector } from "react-redux";
import { expenseFiltersActions } from "../../../states/expense/filters";

export default function FilterIncome({ isOpen }) {
  const selectedIncome = useSelector((state) => state.expenseFilters.income);
  const dispatch = useDispatch();

  function changeHandler(e) {
    dispatch(expenseFiltersActions.income(e.target.value));
  }

  return (
    <div className="filters__item">
      <label htmlFor="income">Income / Expense</label>

      <select
        name="income"
        id="income"
        disabled={isOpen}
        onChange={changeHandler}
        value={selectedIncome}
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
}
