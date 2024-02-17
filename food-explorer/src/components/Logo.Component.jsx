import React from "react";
import logo from "../assets/logo.png";
import "../pages/Login/Styles/Login.css";
import { Link } from 'react-router-dom';

function LogoComponent({ isAdmin }) {
  const linkDestination = '#'
  return (
    <div className="logo">
      <Link to={linkDestination}>
        <div className="logo-text">
          <img src={logo} alt="logo" />
          <h3>food explorer</h3>
        </div>
      </Link>
      {isAdmin && <span className="admin-badge">Admin</span>}
    </div>
  );
}

export default LogoComponent;
