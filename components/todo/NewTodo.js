import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoDbActions } from "../../states/todo/database";
import { todoFiltersActions } from "../../states/todo/filters";

export default function NewTodo({ username }) {
  const [task, setTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("home");

  const categories = useSelector((state) => state.todoFilters.categories);
  const dispatch = useDispatch();

  function changeHandler(e) {
    setTask(e.target.value);
  }

  function addTaskHandler(e) {
    e.preventDefault();

    if (task.trim() === "") {
      return;
    }

    if (selectedCategory === "new") {
      if (categories.includes(task)) return;
      dispatch(todoFiltersActions.addCategory(task));
      setSelectedCategory(task);
    } else if (selectedCategory === "delete") {
      dispatch(todoFiltersActions.removeCategory(task));
      setSelectedCategory(categories[0]);
    } else {
      const newData = {
        task: task,
        category: selectedCategory,
        progress: "active",
        creator: username,
      };

      fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          newData._id = data.newID;
          dispatch(todoDbActions.dbAdd(newData));
        });
    }
    setTask("");
  }

  function selectHandler(e) {
    setSelectedCategory(e.target.value);
  }

  return (
    <form className="newTodo">
      <div className="newTodo__input">
        <label htmlFor="task">
          {selectedCategory === "new"
            ? "Enter New Category Name"
            : selectedCategory === "delete"
            ? "Enter Category Name You Want Delete"
            : "Add Task"}
        </label>
        <input type="text" value={task} onChange={changeHandler} id="task" />
      </div>
      <div className="newTodo__filter">
        <label htmlFor="newTodo__select">Select Category</label>
        <select
          name="todoType"
          value={selectedCategory}
          id="newTodo__select"
          onChange={selectHandler}
        >
          {categories.map((item) => {
            if (item === "all") {
              return;
            } else {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            }
          })}
          <option value="new">Create New</option>
          <option value="delete">Delete Category</option>
        </select>
      </div>
      <button type="submit" onClick={addTaskHandler}>
        {selectedCategory === "new"
          ? "Create Category"
          : selectedCategory === "delete"
          ? "Delete Category"
          : "Add Task"}
      </button>
    </form>
  );
}
