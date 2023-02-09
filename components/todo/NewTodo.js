import { useState } from "react";
import { useDispatch } from "react-redux";
import { todoDbActions } from "../../states/todo/database";

export default function NewTodo({ username }) {
  const [task, setTask] = useState("");

  const dispatch = useDispatch();

  function changeHandler(e) {
    setTask(e.target.value);
  }

  function addTaskHandler(e) {
    e.preventDefault();

    if (task.trim() === "") {
      return;
    }

    const newData = {
      task: task,
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
    setTask("");
  }

  return (
    <form className="newTodo">
      <div className="newTodo__input">
        <label htmlFor="task">Enter New Task</label>
        <input type="text" value={task} onChange={changeHandler} id="task" />
      </div>
      <button type="submit" onClick={addTaskHandler}>
        Add Task
      </button>
    </form>
  );
}
