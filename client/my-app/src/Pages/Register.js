import React, { useState } from "react"
import axios from "axios";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    axios.post("http://localhost:3000/api/users/register", {
      name: name,
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
    </div>
  )
};
export default Registration;
