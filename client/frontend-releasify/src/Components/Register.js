import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Register.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { baseURL } from "../Service/BaseURLService"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Registration = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState("");
  const [userFocus, setUserFocus] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setvalidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  // set the focus on user name: 
  useEffect(() => {
    //userRef.current.focus();
  }, []);

  //validate user: 
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  //note: I don't have a regular expression for validating email here: future task

  //validate password: 
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    console.log(PWD_REGEX.test(password));
    console.log(password);
    setValidConfirmPwd(password === confirmPassword);
  }, [password, confirmPassword])

  useEffect(() => {
    setErrMsg('');
  }, [user, password, confirmPassword]);

  const handleSubmit = () => {
    //event.preventDefault();
    //if button enabled with JS hack: 

    if (password === confirmPassword) {
      axios.post(baseURL + '/api/users/register', {
        user,
        email,
        password,
      }).then((response) => {
        console.log(response);
      });
    } else {
      console.log("mismatched passwords")
    }

    const clearState = () => {
      setUser("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
    clearState();
  }

  return (
    <section className="registration-container">
      <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autocomplete="off"
          onChange={(event) => setUser(event.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onfocus={() => setUserFocus(true)}
          onblur={() => setUserFocus(false)} />
        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.<br />
          must be within a letter. <br />
          Letters, numbers, underscores, and hyphens allowed.
        </p>

        <label>
          email:
          <span className={validEmail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </label>
        <input
          type="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
          onfocus={() => setEmailFocus(true)}
          onblur={() => setEmailFocus(false)} />

        {/* <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Must contain a @.<br />
          This email already exists in our system.
        </p> */}

        <label htmlFor="password">
          Password:
          <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
        </label>
        <input
          type="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.<br />
          Must include uppercase and lowercase letters, a number and a special character.<br />
          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirmpassword">
          Confirm Password:
          <span className={ validConfirmPwd && confirmPassword ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={ validConfirmPwd || !confirmPassword ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirmpassword"
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          aria-invalid={validConfirmPwd ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setConfirmPwdFocus(true)}
          onBlur={() => setConfirmPwdFocus(false)}
        />
        <p id="confirmnote" className={confirmPwdFocus && !validConfirmPwd ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>
        
        <button disabled={!validName || !validPwd ? true : false}>Sign Up</button>
        <p>
          Already registered? <br />
        <span className="line">
          {/* put router link here */}
          <a href="#">Sign In</a>
        </span>
        </p>

      </form>
    </section>
  )
}

export default Registration;