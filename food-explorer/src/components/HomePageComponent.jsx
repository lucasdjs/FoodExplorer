import React from 'react';
import logo from '../assets/teste.png';

function HomePage() {
    return (
      <div className="left">
        <div className="logo">
       <img src={logo} alt="" />
        </div>
        <h1>food explorer</h1>
      </div>
    );
  }
  
  export default HomePage;