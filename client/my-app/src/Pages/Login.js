import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/Login.css"
import {Redirect} from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [redirect, setRedirect] = useState(false);
  

  const login = () => {
    axios.post("http://localhost:3000/api/auth/login", {
      email: email, 
      password: password,
    }).then((response) => {
      console.log(response.data.accessToken);
    })
    setRedirect(true);
  }


  if (redirect) {
    return<Redirect to="/login/userInfo" />
  }

  return (
    <div className="login">
      <h1>Please Login</h1>
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
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

      <button onClick={login}>LOGIN WITH RELEASIFY</button>
    </div>
  )
}


