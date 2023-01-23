export default function LoginButton({ login }) {
  return (
    <button type="submit" className="login__button">
      {login ? "login" : "register"}
    </button>
  );
}
