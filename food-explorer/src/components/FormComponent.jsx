import React, { useState } from "react";
import { StyledButton } from "./Button.styled";
import axios from "../axiosConfig.js";
import { useNavigate } from "react-router-dom";

function FormComponent() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();

        if (senha.length < 6) {
            setError("A senha deve conter pelo menos 6 caracteres.");
            return; 
        }
        try {
            const response = await axios.post(
                "http://localhost:3000/login",
                JSON.stringify({ email, senha }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const { token, isAdmin } = response.data;

            localStorage.setItem("token", token);

            setEmail("");
            setSenha("");

            if (isAdmin) {
                navigate("/home/admin");
            } else {
                navigate("/home/user");
            }
        } 
        catch (error) {
            if (!error?.response) {
                setError("Erro ao acessar o servidor");
            } else if (error.response.status === 401) {
                setError("Usuário ou senha inválidos");
            }
            setEmail("");
            setSenha("");
        }
    };

    return (
        <div className="right">
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <h2>Faça Login</h2>
                    <div>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            type="email"
                            placeholder="Exemplo: exemplo@exemplo.com.br"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="senha">Senha</label>
                        <br />
                        <input
                            type="password"
                            placeholder="No mínimo 6 caracteres"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <StyledButton type="submit">
                        Login
                    </StyledButton>
                </form>
                <p id="error">{error}</p>
            </div>
        </div>
    );
}

export default FormComponent;
