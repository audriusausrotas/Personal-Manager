import { useDispatch, useSelector } from "react-redux";
import { expenseFiltersActions } from "../../../states/expense/filters";
import { useEffect, useState } from "react";

export default function FilterYear({ isOpen }) {
  const selectedYear = useSelector((state) => state.expenseFilters.year);
  const [existingYears, setExistingYears] = useState([]);
  const db = useSelector((state) => state.expenseDb.db);
  const dispatch = useDispatch();

  useEffect(() => {
    const possibleYears = ["all"];
    db.map((item) => {
      const year = new Date(item.date).getFullYear();
      !possibleYears.includes(year) && possibleYears.push(year);
    });
    setExistingYears([...possibleYears]);
  }, [db]);

  function changeHandler(e) {
    dispatch(expenseFiltersActions.year(e.target.value));
  }

  return (
    <div className="filters__item">
      <label htmlFor="year" className="filter">
        Year
      </label>

      <select
        name="year"
        id="year"
        disabled={isOpen}
        onChange={changeHandler}
        value={selectedYear}
      >
        {existingYears.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
