import InfoElement from "./InfoElement";
import { useSelector, useDispatch } from "react-redux";
import { expenseDbActions } from "../../../states/expense/database";

export default function Info() {
  const selectedYear = useSelector((state) => state.expenseFilters.year);
  const selectedMonth = useSelector((state) => state.expenseFilters.month);
  const selectedIncome = useSelector((state) => state.expenseFilters.income);
  const db = useSelector((state) => state.expenseDb.db);
  const dispatch = useDispatch();

  const filtered = db.filter((item) => {
    let year = new Date(item.date).getFullYear().toString();
    let month = (new Date(item.date).getMonth() + 1).toString();
    let income = item.income;

    selectedYear === "all" && (year = selectedYear);
    selectedMonth === "all" && (month = selectedMonth);
    selectedIncome === "all" && (income = selectedIncome);

    return (
      year === selectedYear &&
      month === selectedMonth &&
      income === selectedIncome
    );
  });

  const sorted = filtered
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reverse();

  function del(e) {
    fetch("/api/expense", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemID: e.target.id }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(expenseDbActions.dbRemove(e.target.id)));
  }

  return (
    <div className="info">
      <div className="info__header">
        <div className="info__header--date">Date</div>
        <div className="info__header--desc">Description</div>
        <div className="info__header--amount">Amount</div>
      </div>
      {sorted.map((item) => {
        return (
          <div
            key={item._id}
            className="info__element"
            style={{
              backgroundColor: item.income === "income" ? "#a4fd97" : "#fd9180",
            }}
          >
            <InfoElement data={item} />
            <div className="info__delete" onClick={del} id={item._id}>
              <div
                className="info__delete--btn"
                onClick={del}
                id={item._id}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
