import ExpenseInput from "../ui/expenseInput";
import IncomeSwitch from "../ui/incomeSwitch";

export default function AddExpense(props) {
  return (
    <form className="filters__expense-bar">
      <ExpenseInput
        type="number"
        name="price"
        class="filters__item"
        value={props.price}
        onChange={props.priceHandler}
      />
      <ExpenseInput
        type="text"
        name="description"
        class="filters__item"
        value={props.description}
        onChange={props.descriptionHandler}
      />
      <ExpenseInput
        type="date"
        name="date"
        class="filters__item"
        value={props.date}
        onChange={props.dateHandler}
      />
      <IncomeSwitch income={props.income} incomeHandler={props.incomeHandler} />
    </form>
  );
}
