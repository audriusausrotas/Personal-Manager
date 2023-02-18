import { useSelector } from "react-redux";
import Lists from "../../components/lists";

export default function Info() {
  const selectedYear = useSelector((state) => state.expenseFilters.year);
  const selectedMonth = useSelector((state) => state.expenseFilters.month);
  const selectedIncome = useSelector((state) => state.expenseFilters.income);
  const db = useSelector((state) => state.expenseDb.db);

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

  return <Lists list={sorted} name="expense" />;
}
