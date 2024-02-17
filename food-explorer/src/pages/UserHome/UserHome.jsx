import React from 'react'
import NavbarComponent from '../../components/Navbar.Component'
import './Styles/UserHome.css'
import SlideShow from '../../components/SlideShow'
import Footer from '../../components/Footer.Component'
import HomePage from '../../pages/CardsMeals/HomePage';

const UserHome = () => {
  return (
    <div className='home'>
      <NavbarComponent/>
      <SlideShow />
      <HomePage/>
      <Footer />
    </div>
  )
}

export default UserHome