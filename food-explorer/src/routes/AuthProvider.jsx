import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // Lógica para fazer a solicitação de login usando Axios
    try {
      const response = await axios.post("/login", { username, password });
      const userData = response.data;
      setUser(userData);
      setIsLoggedIn(true);
      // Salve o token de autenticação nos cabeçalhos Axios para futuras solicitações
      axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    // Lógica para fazer logout e limpar o token de autenticação
    setUser(null);
    setIsLoggedIn(false);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
