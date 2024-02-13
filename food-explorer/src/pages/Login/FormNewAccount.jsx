import React, { useState } from "react";
import './Styles/Login.css'
import HomePage from "../../components/HomePageComponent";
import { Link } from "react-router-dom";

function FormNewAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para criar a conta
    console.log("Nome:", name);
    console.log("Email:", email);
    console.log("Senha:", password);
    // Limpar os campos de entrada após o envio do formulário
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="Login">
      <HomePage></HomePage>   
      <div className="right">
        <div className="signup-container">
          <form onSubmit={handleSignUp}>
            <h2>Crie sua conta</h2>
            
            <div>
              <label htmlFor="name">Seu Nome:</label>
              <br />
              <input
                type="text"
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="text"
                id="email"
                placeholder="Exemplo: exemplo@exemplo.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <br />
              <input
                type="password"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Criar Conta</button>
            <br />
            <p>
            <Link to={`/Login`}>Já tenho uma conta</Link> 
          </p>
          </form>         
        </div>
      </div>
    </div>
  );
}

export default FormNewAccount;
