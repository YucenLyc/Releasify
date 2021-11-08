import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom"
import "../Styles/Login.css"; 

export default function userInfo(props) {

  const userInfo = () => {
    axios.get("http://localhost:3000/api/auth/login/userInfo" , {
    }).then((response) => {
      console.log(response.data)     
    })
  }

  return (
    <div>
      <div className="userInfo">
        <header>
          <h1>Personal Information</h1>
        </header>
        <div className="userBody">User Name: {userInfo }</div>
      </div>
    </div>
  )
}

