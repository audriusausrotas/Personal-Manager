export default function PasswordInput({ type, name, value, onChange }) {
  return (
    <div className="password__input">
      <input type={type} id={name} onChange={onChange} value={value} />
    </div>
  );
}
