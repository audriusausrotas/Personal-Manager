import { useState } from "react";
import { useDispatch } from "react-redux";
import { notesDbActions } from "../../states/notes/database";

export default function NoteLarge({ toggleNewNote, username }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function cancelHandler() {
    clearInputs();
    toggleNewNote();
  }

  function saveHandler() {
    const newNote = {
      title: title,
      text: text,
      creator: username,
    };

    fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        newNote._id = data.newID;
        dispatch(notesDbActions.dbAdd(newNote));
        clearInputs();
        toggleNewNote();
      });
  }

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function textChangeHandler(e) {
    setText(e.target.value);
  }

  function clearInputs() {
    setText("");
    setTitle("");
  }

  return (
    <div className="note-large">
      <div className="note-large__background">
        <div className="note-large__buttons">
          <button onClick={saveHandler}>Save</button>
          <button onClick={cancelHandler}>Cancel</button>
        </div>
        <label htmlFor="title">Title</label>
        <input
          className="note-large__title"
          id="title"
          value={title}
          onChange={titleChangeHandler}
        ></input>
        <label htmlFor="text">Text</label>
        <textarea
          className="note-large__text"
          id="text"
          rows={23}
          value={text}
          onChange={textChangeHandler}
        ></textarea>
      </div>
    </div>
  );
}
