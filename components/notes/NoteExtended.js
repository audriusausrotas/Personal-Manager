import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notesDbActions } from "../../states/notes/database";

export default function NoteExtended({ cancelHandler, itemID }) {
  const note = useSelector((state) =>
    state.notesDb.db.find((item) => item._id === itemID)
  );
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const dispatch = useDispatch();

  function editHandler() {
    setEditable((prev) => !prev);
  }

  function titleHandler(e) {
    setTitle(e.target.value);
  }

  function textHandler(e) {
    setText(e.target.value);
  }

  function saveHandler(e) {
    const editedNote = { itemID: e.target.id, title: title, text: text };

    fetch("/api/notes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedNote),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(notesDbActions.dbUpdate(editedNote));
        editHandler();
        cancelHandler();
      });
  }

  return (
    <div className="note-large">
      <div className="note-large__background">
        <div className="note-large__buttons">
          <button onClick={!editable ? editHandler : saveHandler} id={itemID}>
            {!editable ? "Edit" : "Save"}
          </button>
          <button onClick={cancelHandler}>
            {!editable ? "Close" : "Cancel"}
          </button>
        </div>
        <label htmlFor="title">Title</label>
        <input
          className="note-large__title"
          id="title"
          value={title}
          onChange={titleHandler}
          disabled={!editable}
        ></input>
        <label htmlFor="text">Text</label>
        <textarea
          className="note-large__text"
          id="text"
          rows={23}
          value={text}
          onChange={textHandler}
          disabled={!editable}
        ></textarea>
      </div>
    </div>
  );
}
