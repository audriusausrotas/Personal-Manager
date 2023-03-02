import { useSelector } from "react-redux";

export default function NoteExtended({ cancelHandler, itemID }) {
  const note = useSelector((state) =>
    state.notesDb.db.find((item) => item._id === itemID)
  );

  return (
    <div className="note-large">
      <div className="note-large__background">
        <div className="note-large__buttons">
          <button onClick={cancelHandler}>Close</button>
        </div>
        <label htmlFor="title">Title</label>
        <input
          className="note-large__title"
          id="title"
          value={note.title}
          disabled
        ></input>
        <label htmlFor="text">Text</label>
        <textarea
          className="note-large__text"
          id="text"
          rows={23}
          value={note.text}
          disabled
        ></textarea>
      </div>
    </div>
  );
}
