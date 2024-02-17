import NavbarComponent from '../../components/Navbar.Component';
import Footer from '../../components/Footer.Component';
import AddDishForm from '../../components/NewDish.Component'

const NewDish = () => {

  return (
    <div className='newdish'>
        <NavbarComponent />
        <AddDishForm/>
        <Footer />
    </div>
  );
};

export default NewDish;
