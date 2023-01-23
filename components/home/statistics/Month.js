export default function Month({ name, income, expense, maxH }) {
  const expenseHeight = (expense * 100) / maxH + "%";
  const incomeHeight = (income * 100) / maxH + "%";

  return (
    <div className="stat__month">
      <div className="stat__month-info">
        <div className="stat__month--expense" style={{ height: expenseHeight }}>
          <div className="stat__month--text">{expense !== 0 && expense}</div>
        </div>
        <div className="stat__month--income " style={{ height: incomeHeight }}>
          <div className="stat__month--text">{income !== 0 && income}</div>
        </div>
      </div>
      <div className="stat__month-title">{name}</div>
    </div>
  );
}
