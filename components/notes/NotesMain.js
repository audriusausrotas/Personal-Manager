import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { notesDbActions } from "../../states/notes/database";
import AddNote from "./AddNote";
import Note from "./Note";
import NoteLarge from "./NoteLarge";

let check = true;

export default function NotesMain({ username }) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notesDb.db);
  const [newNote, setNewNote] = useState(false);

  useEffect(() => {
    if (check) {
      fetch(`/api/notes?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          data.result.map((item) => {
            dispatch(notesDbActions.dbAdd(item));
          });
        });
      check = false;
    }
  }, [dispatch, username]);

  function toggleNewNote() {
    setNewNote((prev) => !prev);
  }

  return (
    <div className="notes">
      {notes.map((item) => (
        <Note id={item._id} key={item._id} title={item.title} item={item} />
      ))}
      {newNote && (
        <NoteLarge
          username={username}
          newNote={newNote}
          toggleNewNote={toggleNewNote}
        />
      )}
      {!newNote && <AddNote clickHandler={toggleNewNote} />}
    </div>
  );
}
