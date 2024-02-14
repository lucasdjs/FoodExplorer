import React from 'react'
import NavbarComponent from '../../components/NavbarComponent'
import './Styles/UserHome.css'
import SlideShow from '../../components/SlideShow'
import Footer from '../../components/Footer'

const UserHome = () => {
  return (
    <div className='home'>
      <NavbarComponent/>
      <SlideShow />
      <Footer />
    </div>
  )
}

export default UserHome