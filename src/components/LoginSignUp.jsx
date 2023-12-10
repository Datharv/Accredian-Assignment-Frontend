import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import axios from "axios"
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from "../images/loginImage.png"


const api = axios.create({
  baseURL: "http://localhost:3000", 
});


const LoginSignUp = () => {


  const navigate = useNavigate();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [isAuthenticated, setAuthenticated] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [username, setUsername] = useState("")



  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const [isRegistered, setRegistered] = useState(false);

  const registerUser = async () => {
    try {
      const response = await api.post("/register", {
        name:username,
        email:registerEmail,
        password:registerPassword,
      });

      // console.log(response.data.message);
      alert(response.data.message);
      
      
    } catch (error) {
      alert(error.message);
      console.log(error)
     console.error("Registration failed:", error.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };


  const loginUser = async () => {
    try {
      const response = await api.post(`/login`, {
        email: loginEmail,
        password: loginPassword,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setAuthenticated(true);
      console.log("Login successful!");

    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <div>
          <div className="login_signUp_toggle">
            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
          </div>
          <button ref={switcherTab}></button>
        </div>
        <form className="loginForm" ref={loginTab} onSubmit={handleLoginSubmit}>
          <div className="loginEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          {/* <Link to="/password/forgot">Forget Password ?</Link> */}
          <input type="submit" value="Login" className="loginBtn" />
        </form>

        <form
          className="signUpForm"
          ref={registerTab}
          encType="multipart/form-data"
          onSubmit={handleRegisterSubmit}
        >
          <div className="signUpName">
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="signUpEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </div>
          <div className="signUpPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </div>
  
          <input type="submit" value="Register" className="signUpBtn" />
        </form>
        {isRegistered && navigate("/new")}
        {isAuthenticated && navigate("/account")}
      </div>
      <div className="side-image">
        <img
          src={image}
          alt=""
        />
      </div>
    </div>
  );
};

export default LoginSignUp;
