import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Login.css'
import { baseURL } from "../Service/BaseURLService"


const Login = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const login = () => {
    axios.post(baseURL + "/api/auth/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }
      console.log("this is your accessToken:", response.data.accessToken);
      return response.data;
    }).then((response) => {

    })
  }

  return (
    <div className="login-container">
      <div>
        <h3>Please Login</h3>
        <label>
          <p>Email</p>
          <input placeholder="Email" type="text" onChange={(event) => {
            setEmail(event.target.value)
          }}
          />
        </label>
        <label>
          <p>Password</p>
          <input placeholder="Password" type="password" onChange={(event) => {
            setPassword(event.target.value)
          }}
          />
        </label>

        <div className="button-container">
          <button onClick={login}>
            Login
          </button>
        </div>

      </div>
    </div>
  )
}

export default Login;