import { useSelector } from "react-redux";
import Lists from "../components/lists";

export default function TodoList() {
  const db = useSelector((state) => state.todoDb.db);
  const selectedCategory = useSelector(
    (state) => state.todoFilters.selectedCategory
  );
  const selectedProgress = useSelector(
    (state) => state.todoFilters.selectedProgress
  );

  let filteredDB = db;

  if (selectedCategory !== "all")
    filteredDB = filteredDB.filter(
      (item) => item.category === selectedCategory
    );

  if (selectedProgress !== "all")
    filteredDB = filteredDB.filter(
      (item) => item.progress === selectedProgress
    );

  return <Lists list={filteredDB} name="todo" />;
}
