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

  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRetypeError, setPasswordRetypeError] = useState(false);

  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();

    if (login) {
      clearErrors();
      const response = await signIn("credentials", {
        redirect: false,
        username: username,
        password: password,
      });

      if (response.ok) {
        router.push("/expense");
      } else {
        setError(response.error);
      }
    } else {
      clearErrors();
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          passwordRetype: passwordRetype,
          email: email,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        if (data.code === 5) {
          setPasswordError(true);
          setPasswordRetypeError(true);
        } else if (data.code === 1) {
          setUsernameError(true);
        } else if (data.code === 2) {
          setEmailError(true);
        } else if (data.code === 3) {
          setPasswordError(true);
        } else if (data.code === 4) {
          setPasswordRetypeError(true);
        } else {
          setError(data.message);
        }
      } else {
        loginHandler();
        setError("User created successfully");
      }
    }
  }

  function loginHandler() {
    clearErrors();
    setLogin((prev) => !prev);
  }

  function usernameHandler(e) {
    setUsernameError(false);
    setUsername(e.target.value);
  }

  function passwordHandler(e) {
    setPasswordError(false);
    setPassword(e.target.value);
  }

  function passwordRetypeHandler(e) {
    setPasswordRetypeError(false);
    setPasswordRetype(e.target.value);
  }

  function emailHandler(e) {
    setEmailError(false);
    setEmail(e.target.value);
  }

  function clearErrors() {
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setPasswordRetypeError(false);
    setError("");
  }

  return (
    <div className="login">
      <form onSubmit={submitHandler} className="login__box">
        <h1 className="login__title">{login ? "login" : "register"}</h1>

        <div className="login__error">{error}</div>

        <div className="login__inputs">
          <LoginInput
            type="text"
            name="Username"
            id="username"
            placeholder="Type your username"
            value={username}
            onChange={usernameHandler}
            error={usernameError}
          />

          {!login && (
            <LoginInput
              type="email"
              name="Email"
              id="email"
              placeholder="Type your email address"
              value={email}
              onChange={emailHandler}
              error={emailError}
            />
          )}

          <LoginInput
            type="password"
            name="Password"
            id="password"
            placeholder="Type your password"
            value={password}
            onChange={passwordHandler}
            error={passwordError}
          />

          {!login && (
            <LoginInput
              type="password"
              name="Re-type Password"
              id="passwordRetype"
              placeholder="Re-type your password"
              value={passwordRetype}
              onChange={passwordRetypeHandler}
              error={passwordRetypeError}
            />
          )}
        </div>

        <LoginButton login={login} />

        <div className="login__register">
          Or
          <span onClick={loginHandler}>{login ? " Register " : " Login "}</span>
          Using {login ? " Email" : " Username"}
        </div>
      </form>
    </div>
  );
}
