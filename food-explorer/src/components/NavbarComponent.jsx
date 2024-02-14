import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignOutAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { StyledButton } from "./Button.styled";
import LogoComponent from "./Logo.styled";
import { StyledButtonIcon } from "./ButtonIcon.styled";

const NavbarComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Adicione aqui sua lógica para realizar a pesquisa conforme o usuário digita
    console.log("Pesquisar:", event.target.value);
  };

  const handleLogout = () => {
    // Aqui você pode implementar a lógica para logout
    console.log("Logout");
  };

  return (
    <nav>
      <div className="row align-items-start navbar">
        <div className="col-12 col-md-2 d-flex justify-content-start align-items-center">
          <button
            className="navbar-toggler d-md-none text-start"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon custom-toggler-icon"></span>
          </button>
          <LogoComponent />
        </div>

        <div className="col-6 col-md-6 cold-sm-5 d-none d-md-block">
          {" "}
          <div className="search-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="        Busque por pratos ou ingredientes..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="search-input"
            />
          </div>
        </div>

        <div className="col-3 d-none d-md-block">
          <div className="button-pedidos">
            <StyledButton>
              <FontAwesomeIcon icon={faShoppingCart} />
              Pedidos
            </StyledButton>
          </div>
        </div>
        <div className="col d-none d-md-block">
          <StyledButtonIcon onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </StyledButtonIcon>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel"
      >
        <div className="offcanvas-header d-flex align-items-center justify-content-start">
          <button
            type="button"
            className="btn-close btn-close-white me-2 btn-outline-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          <h5
            className="offcanvas-title text-white mb-0"
            id="offcanvasDarkNavbarLabel"
          >
            Menu
          </h5>
        </div>

        <div class="col-12">
          <div className="navbar-search">
            <div className="search-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="     Busque por pratos ou ingredientes"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
            <li className="nav-item">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
              >
                Sair
              </a>
              <hr />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
