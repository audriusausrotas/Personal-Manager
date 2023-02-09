import { useSelector, useDispatch } from "react-redux";
import { todoFiltersActions } from "../../states/todo/filters";

export default function TodoFilters() {
  const categories = useSelector((state) => state.todoFilters.categories);
  const dispatch = useDispatch();

  function categoryHandler(e) {
    dispatch(todoFiltersActions.setCategory(e.target.value));
  }

  function progressHandler(e) {
    dispatch(todoFiltersActions.setProgress(e.target.value));
  }

  return (
    <div className="todoFilter">
      <div className="todoFilter__category">
        <label htmlFor="todoCategory">Category</label>
        <select name="Categody" id="todoCategory" onChange={categoryHandler}>
          <option value="all">all</option>
          {categories.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="todoFilter__progress">
        <label htmlFor="todoProgress">Progress</label>
        <select name="progress" id="todoProgress" onChange={progressHandler}>
          <option value="all">All</option>
          <option value="finished">Finished</option>
          <option value="active">Active</option>
        </select>
      </div>
    </div>
  );
}
