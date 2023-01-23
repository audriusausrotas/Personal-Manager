export default function ExpenseInput(props) {
  return (
    <div className={props.class}>
      <label htmlFor={props.name}>{props.name}</label>
      <input
        type={props.type}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
