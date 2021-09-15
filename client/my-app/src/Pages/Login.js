import React, { useState } from 'react';
import axios from "axios";
 
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');

  const login = () => {
    const data = { email: email, password: password };
    axios
      .post("http://localhost:3000/login", data)
      .then((response) => {
        if (response.data.error){
          alert(response.data.error)
        } else {
        console.log("email:", response.data.email)
        console.log("id", response.data.id)
      }
    })  
  };
 
  return (
    <div>
      Login<br /><br />
      <div>
        Email<br />
        <input type="text" onChange={(event) =>{
          setEmail(event.target.value)
        }} />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" onChange={(event)=>{
          setPassword(event.target.value)
        }} />
      </div>
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
};
export default Login;
