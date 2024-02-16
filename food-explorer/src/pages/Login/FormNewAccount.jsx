import React, { useState } from "react";
import axios from "axios";
import "./Styles/Login.css";
import HomePage from "../../components/HomePageComponent";
import { Link } from "react-router-dom";
import { StyledButton } from "../../components/Button.styled";

function FormNewAccount() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/addUser", {
        nome,
        email,
        senha,
      });

      setNome("");
      setEmail("");
      setSenha("");
      setAlertMessage("")
      setUserCreated(true);
    } catch (error) {
      if (error.response.status === 409) {
        setAlertMessage(
          "O email já está cadastrado. Por favor, tente outro email ou realize o login."
        );
      } else {
        setAlertMessage("Erro ao criar usuário. Por favor, tente novamente.");
      }
      setUserCreated(false);
    }

  };

  return (
    <div className="Login">
      <HomePage></HomePage>
      <div className="right">
        <div className="login-container">
          <form onSubmit={handleSignUp}>
            <h2>Crie sua conta</h2>

            <div>
              <label htmlFor="nome">Seu Nome:</label>
              <br />
              <input
                type="text"
                id="name"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
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
                required
              />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <br />
              <input
                type="password"
                id="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <StyledButton type="submit">Criar Conta</StyledButton>
            <br />
            {userCreated && (
              <div className="alert alert-success" role="alert">
                <p id="alert">
                  Usuário criado com sucesso! Faça o{" "}
                  <Link to={`/Login`}>login</Link>
                </p>
              </div>
            )}

            {alertMessage && (
              <div className="alert alert-danger" role="alert">
                <p id="alert">{alertMessage}</p>
              </div>
            )}
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
