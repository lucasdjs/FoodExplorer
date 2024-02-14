import React from 'react';
import logo from '../assets/logo.png';
import '../pages/Login/Styles/Login.css'

function LogoComponent() {
    return (
      <div className="logo">
        <img src={logo} alt="logo" />
        <h3>food explorer</h3>
      </div>
    );
  }
  
  export default LogoComponent;