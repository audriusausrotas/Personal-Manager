import { useDispatch, useSelector } from "react-redux";
import { expenseFiltersActions } from "../../../states/expense/filters";

export default function FilterMonth({ isOpen }) {
  const selectedMonth = useSelector((state) => state.expenseFilters.month);
  const dispatch = useDispatch();

  function changeHandler(e) {
    dispatch(expenseFiltersActions.month(e.target.value));
  }

  return (
    <div className="filters__month filters__item">
      <label htmlFor="month">Month</label>

      <select
        name="month"
        id="month"
        disabled={isOpen}
        onChange={changeHandler}
        value={selectedMonth}
      >
        <option value="all">all</option>
        <option value="1">january</option>
        <option value="2">february</option>
        <option value="3">march</option>
        <option value="4">april</option>
        <option value="5">may</option>
        <option value="6">june</option>
        <option value="7">july</option>
        <option value="8">august</option>
        <option value="9">september</option>
        <option value="10">october</option>
        <option value="11">november</option>
        <option value="12">december</option>
      </select>
    </div>
  );
}
