export default function AddNote({ clickHandler }) {
  return (
    <div className="new-note">
      <div className="new-note__circle" onClick={clickHandler}>
        <div className="new-note__plus"></div>
      </div>
    </div>
  );
}
