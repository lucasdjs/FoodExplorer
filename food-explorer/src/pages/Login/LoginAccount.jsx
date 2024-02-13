import React, { useState } from "react";
import "./Styles/Login.css";
import HomePage from "../../components/HomePageComponent";
import FormComponent from "../../components/FormComponent"

function LoginAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de login
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="Login">
      <HomePage></HomePage>
      <FormComponent/>
    </div>
  );
}

export default LoginAccount;
