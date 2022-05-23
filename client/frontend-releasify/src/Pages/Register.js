import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const baseURL = process.env.REACT_APP_API_BASE_URL;
  console.log("this is the base URL:", baseURL);

  const register = () => {
    if (password === confirmPassword) {
      console.log(baseURL)
      axios.post( baseURL + '/api/users/register', {
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

  return (
    <div>
      <div>
        <h3>Registration</h3>
        <label>Username</label>
        <input type="text"
        value={name}
        placeholder="Username"
        onChange={(event) => {
          setName(event.target.value);
        }}
        />
        <label>Email</label>
        <input type="text"
        value={email}
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        />
        <label>Password</label>
        <input type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        />
         <label>Confirm Password</label>
        <input type="password"
        placeholder="Confirm Password"
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
        />
         <button onClick={()=> register()}>Submit</button>
      </div>
    </div>
  )
}

export default Registration;