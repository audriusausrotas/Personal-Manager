import DeleteButton from "../components/deleteButton";
import NoteExtended from "./NoteExtended";
import { notesDbActions } from "../../states/notes/database";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Note({ title, id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [itemID, setItemID] = useState("");

  function deleteHandler(e) {
    fetch("/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemID: e.target.parentElement.id }),
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch(notesDbActions.dbRemove(e.target.parentElement.id))
      );
  }

  function clickHandler(e) {
    !open && setItemID(e.target.id);
    setOpen((prev) => !prev);
  }

  return (
    <div className="note">
      {open && <NoteExtended cancelHandler={clickHandler} itemID={itemID} />}
      <DeleteButton id={id} onClick={deleteHandler}></DeleteButton>
      <div className="note__title" onClick={clickHandler} id={id}>
        {title}
      </div>
    </div>
  );
}
