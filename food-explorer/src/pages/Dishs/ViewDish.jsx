import NavbarComponent from '../../components/Navbar.Component';
import Footer from '../../components/Footer.Component';
import ViewCard from '../../components/ViewDish.Component';
import '../../Styles/ViewDish.css'

const ViewDishPage = () => {
    
    return (
    <div className='viewDishPage'>
        <NavbarComponent/>
        <ViewCard/>
        <Footer/>
    </div>
    );
  }
  
  export default ViewDishPage;
  