import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "../Styles/Login.css"
import {Redirect} from "react-router-dom";
import auth from './Auth'


require('dotenv').config();

export default function Login(props) {
  //let history = useHistory();

  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [error, setError] = useState([]);
  const [redirect, setRedirect] = useState(false);
  
  const baseURL = process.env.REACT_APP_API_BASE_URL
  const login = () => {
    axios.post( baseURL + "/api/auth/login", {
      email: email, 
      password: password,
    }).then((response) => {
      console.log(response.data.accessToken);
    })
    console.log("logged in, now redirect me")
    setRedirect(true); 
  }

  if (redirect) {
    return<Redirect to="profile" />
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

      <button onClick={
        ()=> {
          auth.login(() => {
              props.history.push("/profile")
          })
        }
      }>LOGIN WITH RELEASIFY</button>
    </div>
  )
}


