export default function PasswordButton({ name, onClick, onChange }) {
  return (
    <button onClick={onClick} onChange={onChange}>
      {name}
    </button>
  );
}
