import React from 'react'
import NavbarComponent from '../../components/Navbar.Component'
import './Styles/UserHome.css'
import SlideShow from '../../components/SlideShow'
import Footer from '../../components/Footer.Component'
import HomePage from '../../pages/CardsMeals/HomePage';

const UserHome = () => {
  
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        return tokenPayload.sub;
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
      }
    } else {
      console.error("Token não encontrado na localStorage.");
      return null;
    }
  };

  const userId = getUserIdFromToken();

  return (
    <div className='home'>
      <NavbarComponent isAdmin={false} idUser={userId}/>
      <SlideShow />
      <HomePage isAdmin={false}/>
      <Footer />
    </div>
  )
}

export default UserHome