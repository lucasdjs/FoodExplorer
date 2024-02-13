import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignOutAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import logo from '../assets/teste.png';
import {StyledButton} from './Button.styled'

const NavbarComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Adicione aqui sua lógica para realizar a pesquisa conforme o usuário digita
    console.log('Pesquisar:', event.target.value);
  };

  const handleLogout = () => {
    // Aqui você pode implementar a lógica para logout
    console.log('Logout');
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h3>food explorer</h3>
      </div>

      <div className="navbar-search">
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="     Pesquisar..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="search-input"
          />
        </div>
      </div>

      <div className="navbar-button-order">
      <StyledButton> <FontAwesomeIcon icon={faShoppingCart} />
          Pedidos</StyledButton>
        <StyledButton onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Sair
        </StyledButton>
      </div>

    </nav>
  );
};

export default NavbarComponent;
