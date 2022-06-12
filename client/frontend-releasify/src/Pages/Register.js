import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Register.css';
import { baseURL } from "../Service/BaseURLService"

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    if (password === confirmPassword) {
      axios.post(baseURL + '/api/users/register', {
        name,
        email,
        password,
      }).then((response) => {
        console.log(response);
      });
    } else {
      console.log("mismatched passwords")
    }

    //clear user input after submission:
    const clearState = () => {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
    clearState();
  }

  return (
    <div className="registration-container">
      <div>
        <h3>Registration</h3>
        <label>
          <p>Username</p>
          <input type="text"
            value={name}
            placeholder="Username"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>

        <label>
          <p>Email</p>
          <input type="text"
            value={email}
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>

        <label>
          <p>Password</p>
          <input type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>

        <label>
          <p>Confirm Password</p>
          <input type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </label>

        <div className="button-container">
          <button onClick={() => register()}>
            Submit
          </button>
        </div>

      </div>
    </div>
  )
}

export default Registration;