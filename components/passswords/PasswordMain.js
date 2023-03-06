import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordInput from "./PasswordInput";
import PasswordButton from "./PasswordButton";
import PasswordLabel from "./PasswordLabel";
import ListItem from "./ListItem";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { passwordDbActions } from "../../states/password/database";

const CHARS =
  "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let check = true;

export default function PasswordMain({ username }) {
  const [website, setWebsite] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedID, setselectedID] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [edit, setEdit] = useState(false);

  const passwords = useSelector((state) => state.passwordDb.db);

  const dispatch = useDispatch();

  function websiteHandler(e) {
    setWebsite(e.target.value);
  }

  function userHandler(e) {
    setUser(e.target.value);
  }

  function emailHandler(e) {
    setEmail(e.target.value);
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
  }

  function search() {
    const found = passwords.find((item) => item.website.includes(website));
    found && itemClickHandler(found);
  }

  function generatePassword(e) {
    let randomPassword = "";
    for (let i = 0; i < 12; i++) {
      randomPassword += CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    setPassword(randomPassword);
  }

  function addHandler() {
    const newItem = {
      website: website,
      user: user,
      email: email,
      password: password,
      creator: username,
    };

    fetch("/api/password", {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        newItem._id = data.newID;
        dispatch(passwordDbActions.dbAdd(newItem));
        clearHandler();
      });
  }

  function updateHandler() {
    const editedNote = {
      itemID: selectedID,
      website: website,
      user: user,
      email: email,
      password: password,
    };

    fetch("/api/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedNote),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(passwordDbActions.dbUpdate(editedNote));
        setEdit(false);
      });
  }

  function deleteHandler(e) {
    fetch("/api/password", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemID: e.target.id }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(passwordDbActions.dbRemove(e.target.id)));
  }

  function clearHandler() {
    setWebsite("");
    setUser("");
    setEmail("");
    setPassword("");
    setselectedID("");
    setEdit(false);
  }

  function itemClickHandler(item) {
    setWebsite(item.website);
    setUser(item.user);
    setEmail(item.email);
    setPassword(item.password);
    setselectedID(item._id);
    setEdit(true);
  }

  function showPasswordHandler() {
    setShowPassword("text");
  }
  function hidePasswordHandler() {
    setShowPassword("password");
  }

  useEffect(() => {
    if (check) {
      fetch(`/api/password?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          data.result.map((item) => {
            dispatch(passwordDbActions.dbAdd(item));
          });
        });
      check = false;
    }
  }, [dispatch, username]);

  return (
    <div className="password">
      <div className="password__app">
        <div className="password__logo">
          <Image
            width={200}
            height={198}
            priority
            src="/passwordLogo.png"
            alt="image of a lock"
          />
        </div>
        <div className="password__fields">
          <div className="password__labels">
            <PasswordLabel name="website" />
            <PasswordLabel name="username" />
            <PasswordLabel name="email" />
            <PasswordLabel name="password" />
          </div>
          <div className="password__inputs">
            <div className="password__website">
              <PasswordInput
                type="text"
                name="website"
                value={website}
                onChange={websiteHandler}
              />
              <PasswordButton name="search" onClick={search} />
            </div>
            <PasswordInput
              type="text"
              name="username"
              value={user}
              onChange={userHandler}
            />
            <PasswordInput
              type="email"
              name="email"
              value={email}
              onChange={emailHandler}
            />
            <div className="password__password">
              <PasswordInput
                type={showPassword}
                name="password"
                value={password}
                onChange={passwordHandler}
              />

              <div
                className="password__input--icon"
                onMouseDown={showPasswordHandler}
                onMouseUp={hidePasswordHandler}
                onMouseOut={hidePasswordHandler}
              >
                <FaRegEye size={30} color="#787878" />
              </div>

              <PasswordButton
                name="Generate Password"
                onClick={generatePassword}
              />
            </div>
            <div className="password__buttons">
              <PasswordButton
                name={edit ? "update" : "add"}
                onClick={edit ? updateHandler : addHandler}
              />
              <PasswordButton name="clear" onClick={clearHandler} />
            </div>
          </div>
        </div>
      </div>
      <ul className="password__list">
        {passwords.map((item) => (
          <ListItem
            key={item._id}
            website={item.website}
            id={item._id}
            deleteHandler={deleteHandler}
            clickHandler={() => itemClickHandler(item)}
          />
        ))}
      </ul>
    </div>
  );
}
