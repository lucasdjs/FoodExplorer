import React from "react";
import logo from "../assets/logo.png";
import "../pages/Login/Styles/Login.css";
import { Link } from 'react-router-dom';

function LogoComponent({ isAdmin }) {
  let linkDestination = '#';
  if(isAdmin){
    linkDestination = 'http://localhost:5173/home/admin'
  }
  else{
    linkDestination  ='http://localhost:5173/home/user'
  }

  return (
    <div className="logo ">
      <Link to={linkDestination}>
        <div className="logo-text row">
          <img className="col-2 ml-2" src={logo} alt="logo" />
          <h3 className="col">food explorer</h3>
        </div>
        <div className="row">      {isAdmin && <span className="admin-badge">Admin</span>}</div>
      </Link>

    </div>
  );
}

export default LogoComponent;
