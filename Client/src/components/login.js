// React Components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateAuth } from "./context/authProvider";
import Axios from "axios";

// Styles
import "../styles/login.scss";

const Login = () => {
  const updateAuth = useUpdateAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const tryToLogin = async (e) => {
    var emailExist;
    var correctPassword;
    var userType;
    var FName;
    var LName;
    var ID;

    e.preventDefault();

    await Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((res) => {
      console.log(res);
      emailExist = res.data["emailExist"];
      correctPassword = res.data["correctPassword"];
      userType = res.data["userType"];

      if (correctPassword === 1) {
        LName = res.data["LName"];
        FName = res.data["FName"];
        ID = res.data["ID"];
      }
    });

    console.log(emailExist);
    console.log(correctPassword);

    if (emailExist === 1) {
      if (correctPassword === 1) {
        console.log(email, password);
        updateAuth({
          email: email,
          FName: FName,
          LName: LName,
          userType: userType,
          ID: ID,
        });

        localStorage.setItem("Email", email);
        localStorage.setItem("FName", FName);
        localStorage.setItem("LName", LName);
        localStorage.setItem("userType", userType);
        localStorage.setItem("ID", ID);

        navigate("/");
      } else {
        setPassword("");
        document.getElementById("wrong-password").style.display = "block";
        document.getElementById("not-registered").style.display = "none";

        setTimeout(() => {
          document.getElementById("wrong-password").style.display = "none";
        }, 3000);
      }
    } else {
      setEmail("");
      setPassword("");
      document.getElementById("not-registered").style.display = "block";
      document.getElementById("wrong-password").style.display = "none";
      setTimeout(() => {
        document.getElementById("not-registered").style.display = "none";
      }, 3000);
    }
  };
  return (
    ///Centering
    <div style={{ width: "30%", position: "relative", margin: "0 auto" }}>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                required={true}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                required={true}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div
              className="alert alert-danger"
              role="alert"
              id="wrong-password"
              style={{ marginTop: "3%", height: "10%" }}
            >
              The Password is incorrect!
            </div>
            <div
              className="alert alert-danger"
              role="alert"
              id="not-registered"
              style={{ marginTop: "3%", height: "10%" }}
            >
              This email is not registered!
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={email.length === 0 || password.length === 0}
                onClick={tryToLogin}
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
