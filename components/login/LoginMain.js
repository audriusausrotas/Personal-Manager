import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginMain() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState(true);

  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();

    if (login) {
      const result = await signIn("credentials", {
        redirect: false,
        username: username,
        password: password,
      });

      if (!result.error) {
        router.push("/expense");
      }
    } else {
      fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          passwordRetype: passwordRetype,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          loginHandler();
        });
    }
  }

  function loginHandler() {
    setLogin((prev) => !prev);
  }

  function usernameHandler(e) {
    setUsername(e.target.value);
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
  }
  function passwordRetypeHandler(e) {
    setPasswordRetype(e.target.value);
  }
  function emailHandler(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="login">
      <form onSubmit={submitHandler} className="login__box">
        <h1 className="login__title">{login ? "login" : "register"}</h1>
        <div className="login__inputs">
          <LoginInput
            type="text"
            name="Username"
            id="username"
            placeholder="Type your username"
            value={username}
            onChange={usernameHandler}
          />

          {!login && (
            <LoginInput
              type="email"
              name="Email"
              id="email"
              placeholder="Type your email address"
              value={email}
              onChange={emailHandler}
            />
          )}

          <LoginInput
            type="password"
            name="Password"
            id="password"
            placeholder="Type your password"
            value={password}
            onChange={passwordHandler}
          />

          {!login && (
            <LoginInput
              type="password"
              name="Re-type Password"
              id="passwordRetype"
              placeholder="Re-type your password"
              value={passwordRetype}
              onChange={passwordRetypeHandler}
            />
          )}
        </div>
        <LoginButton login={login} />
        <div className="login__register">
          Or
          <span onClick={loginHandler}>{login ? " Register " : " Login "}</span>
          Using Email
        </div>
      </form>
    </div>
  );
}
