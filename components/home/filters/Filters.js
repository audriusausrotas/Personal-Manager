import { expenseDbActions } from "../../../states/expense/database";
import { useDispatch } from "react-redux";
import FilterMonth from "./FilterMonth";
import FilterYear from "./FilterYear";
import FilterIncome from "./FilterIncome";
import AddButton from "../ui/addButton";
import AddExpense from "./AddExpense";
import { useState } from "react";

export default function Filters({ username }) {
  const today = new Date().toJSON().slice(0, 10);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(today);
  const [income, setIncome] = useState("expense");
  const dispatch = useDispatch();

  function saveDataHandler() {
    if (!price.trim()) {
    } else if (!description.trim()) {
    } else if (!date) {
    } else {
      const newData = {
        price: +price,
        description: description,
        date: date,
        income: income,
        creator: username,
      };

      fetch("/api/expense", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          newData._id = data.newID;
          dispatch(expenseDbActions.dbAdd(newData));
        });

      setPrice("");
      setDescription("");
      setDate(today);
      setIncome("expense");
    }
  }

  function priceHandler(e) {
    setPrice(e.target.value);
  }

  function descriptionHandler(e) {
    setDescription(e.target.value);
  }

  function dateHandler(e) {
    setDate(e.target.value);
  }

  function incomeHandler() {
    setIncome((prev) => (prev === "expense" ? "income" : "expense"));
  }

  function openHandler() {
    isOpen ? saveDataHandler() : setIsOpen((prev) => !prev);
  }

  function cancelHandler() {
    setIsOpen((prev) => !prev);
  }

  a = 5;
  b = 6;

  if (a > b) {
    console.log("daugiau");
  }

  return (
    <div className="filters">
      <div className="filters__elements">
        <FilterYear isOpen={isOpen} />
        <FilterMonth isOpen={isOpen} />
        <FilterIncome isOpen={isOpen} />
        <AddButton
          isOpen={isOpen}
          openHandler={openHandler}
          cancelHandler={cancelHandler}
        />
      </div>
      {isOpen && (
        <AddExpense
          price={price}
          description={description}
          date={date}
          income={income}
          priceHandler={priceHandler}
          descriptionHandler={descriptionHandler}
          dateHandler={dateHandler}
          incomeHandler={incomeHandler}
        />
      )}
    </div>
  );
}
