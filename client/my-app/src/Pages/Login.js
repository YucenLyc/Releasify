import React, { useState } from 'react';
import axios from 'axios';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios.post("http://localhost:3000/api/auth/login", {
      email: email,
      password: password,
    }).then((response) => {
      console.log("user logged in");
    });
  }


  return (
    <div className="login-wrapper">
      <h1>Please Login</h1>
      <label>
        <p>Email</p>
        <input type="text" onChange={(event) => {
          setEmail(event.target.value)
        }}
        />
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={(event) => {
          setPassword(event.target.value)
        }}
        />
      </label>
      <div>
        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default Login;





















































// import React, { useState } from 'react';
// import axios from "axios";

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword]= useState('');

//   const login = () => {
//     const data = { email: email, password: password };
//     axios
//       .post("http://localhost:3000/api/auth/login", data)
//       .then((response) => {
//         if (response.data.error){
//           alert(response.data.error)
//         } else {
//         console.log("successfully logged in")
//       }
//     })  
//   };

//   return (
//     <div>
//       Login<br /><br />
//       <div>
//         Email<br />
//         <input type="text" onChange={(event) =>{
//           setEmail(event.target.value)
//         }} />
//       </div>
//       <div style={{ marginTop: 10 }}>
//         Password<br />
//         <input type="password" onChange={(event)=>{
//           setPassword(event.target.value)
//         }} />
//       </div>
//       <br />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// };
// export default Login;
