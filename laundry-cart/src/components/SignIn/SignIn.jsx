import React, { useState } from "react";
import "./SignIn.css";
import padlock from "./padlock.svg";
import { useNavigate } from "react-router-dom";
import { contextProvider } from "../../Context/Context";
import { ToastContainer, toast } from "react-toastify";
const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });
  const { getAllPastOrders, PastOrders, userName, setUserName } =
    contextProvider();

  const navigate = useNavigate();
  const [Token, setToken] = useState("");

  const signInApi = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://laundry-cart-backend-c8cj.onrender.com/users/signin",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    const res = await response.json();
    const token = res.token;
    console.log(res);

    localStorage.setItem("token", token);
    if (token) {
      navigate("/products");

      toast.success(`🦄 ${res.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn(`🦄 ${res.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  function getInputChangeHandler(key) {
    return (e) => {
      const val = e.target.value;
      setCredentials((credentials) => {
        return {
          ...credentials,
          [key]: val,
        };
      });
    };
  }
  return (
    <form method="POST" onSubmit={signInApi}>
      <span className="signIn-title">SIGN IN</span>
      <input
        type="text"
        placeholder="Mobile/Email"
        // value={credentials.email || credentials.phoneNumber}
        onChange={(e) => {
          !/[a-zA-Z]/.test(e.target.value)
            ? setCredentials((credentials) => {
                return {
                  ...credentials,
                  phoneNumber: e.target.value,
                };
              })
            : setCredentials((credentials) => {
                return {
                  ...credentials,
                  email: e.target.value,
                };
              });
        }}
      />
      <input
        type="password"
        placeholder="Password"
        // value={credentials.password}
        onChange={getInputChangeHandler("password")}
      />
      <img src={padlock} />
      <span className="forgot-password">Forgot Password?</span>
      <button type="Submit">Sign In</button>
    </form>
  );
};

export default SignIn;
