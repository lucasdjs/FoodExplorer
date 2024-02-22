import { Link } from 'react-router-dom';
import NavbarComponent from '../../components/Navbar.Component';
import Footer from '../../components/Footer.Component';
import '../../Styles/Error.css'

const ErrorPage = () => {
    return (
        <div className='error'>
          <NavbarComponent/>
          <h1>Error 404</h1>
          <Footer />
        </div>
      );
}

export default ErrorPage;
