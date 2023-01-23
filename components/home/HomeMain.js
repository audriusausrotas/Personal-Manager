import { useDispatch } from "react-redux";
import Filters from "./filters/Filters";
import Statistics from "./statistics/Statistics";
import Info from "./info/Info";
import { useEffect } from "react";
import { expenseDbActions } from "../../states/expense/database";

let check = true;

export default function HomeMain({ username }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (check) {
      fetch("/api/expense")
        .then((response) => response.json())
        .then((data) => {
          data.result.map((item) => {
            item.creator === username && dispatch(expenseDbActions.dbAdd(item));
          });
        });
      check = false;
    }
  }, [dispatch, username]);

  return (
    <div className="home">
      <Filters username={username} />
      <Statistics />
      <Info />
    </div>
  );
}
