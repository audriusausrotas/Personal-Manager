import { BsPerson } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { FiLock } from "react-icons/fi";

export default function LoginInput(props) {
  return (
    <div className="login__input">
      <label className="login__label" htmlFor={props.id}>
        {props.name}
      </label>
      <div className="login__input-input">
        <div className="login__input-icon">
          {props.type === "text" && <BsPerson />}
          {props.type === "password" && <FiLock />}
          {props.type === "email" && <BsEnvelope />}
        </div>
        <input
          placeholder={props.placeholder}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          required
        />
      </div>
    </div>
  );
}
