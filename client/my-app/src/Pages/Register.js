import React, { useState } from "react"
import axios from "axios";

import "../Styles/Register.css"

function Registration() {
  const [isError, setIsError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");



  const register = () => {
    if (password === passwordConfirmation) {
      axios.post("http://localhost:3000/api/users/register", {
        name: name,
        email: email,
        password: password,
      }).then((response) => {
        console.log(response);
      });
    } else {
      console.log("mismatched passwords")
    }
  }

  const checkValidation = (event) => {
    setPasswordConfirmation(event.target.value)
    if (password !== event.target.value) {
      setIsError("Confirm Password Should Match Password!")
    } else {
      setIsError("");
    }
  }

  return (
    <div className="App">
      <div className="registration">
        <form>
        <div className="error-msg">{isError}</div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="email@email.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            className="password"
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label>Confirm Password</label>
          <input
            value={passwordConfirmation}
            type="password"
            className="confirm-password"
            placeholder="Confirm Password"
            onChange={(event) => checkValidation(event)}
          />
          <button onClick={register}>Register</button>
        </form>
      </div>
    </div>
  )
};
export default Registration;
