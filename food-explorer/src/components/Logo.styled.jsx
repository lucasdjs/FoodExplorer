import React from 'react';
import logo from '../assets/teste.png';

function LogoComponent() {
    return (
      <div className="logo">
        <img src={logo} alt="logo" />
        <h3>food explorer</h3>
      </div>
    );
  }
  
  export default LogoComponent;