import Month from "./Month";
import { useSelector } from "react-redux";

export default function Statistics() {
  const db = useSelector((state) => state.expenseDb.db);
  const selectedYear = useSelector((state) => state.expenseFilters.year);
  const months = [
    { name: "January", income: 0, expense: 0 },
    { name: "February", income: 0, expense: 0 },
    { name: "March", income: 0, expense: 0 },
    { name: "April", income: 0, expense: 0 },
    { name: "May", income: 0, expense: 0 },
    { name: "June", income: 0, expense: 0 },
    { name: "July", income: 0, expense: 0 },
    { name: "August", income: 0, expense: 0 },
    { name: "September", income: 0, expense: 0 },
    { name: "October", income: 0, expense: 0 },
    { name: "November", income: 0, expense: 0 },
    { name: "December", income: 0, expense: 0 },
  ];
  let maxH = 0;

  const filtered =
    selectedYear === "all"
      ? db
      : db.filter((item) => {
          const year = new Date(item.date).getFullYear().toString();
          return year === selectedYear;
        });

  filtered.map((item) => {
    const currentMonth = new Date(item.date).getMonth();
    item.income === "income"
      ? (months[currentMonth].income += item.price)
      : (months[currentMonth].expense += item.price);
  });

  months.map((item) => {
    maxH < item.income && (maxH = item.income);
    maxH < item.expense && (maxH = item.expense);
  });

  return (
    <div className="stat">
      {months.map((item, index) => {
        return (
          <Month
            key={index}
            name={item.name}
            income={item.income}
            expense={item.expense}
            maxH={maxH}
          />
        );
      })}
    </div>
  );
}

{
}
