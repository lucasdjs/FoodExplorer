import NavbarComponent from '../../components/Navbar.Component';
import Footer from '../../components/Footer.Component';
import ViewCard from '../../components/ViewDish.Component';
import '../../Styles/ViewDish.css'
import React, { useEffect, useState } from 'react';
import axios from "../../axiosConfig";
import { useNavigate } from 'react-router-dom';

const ViewDishAdminPage = () => {
    
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminStatus = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('Token não encontrado');
            }
    
            const response = await axios.get("http://localhost:3000/userInfo", {
              headers: { Authorization: `Bearer ${token}` },
            });
    
             const isAdminResponse = response.data;

            setIsAdmin(isAdminResponse);

          } catch (error) {
            console.error('Erro ao verificar o status de administrador:', error);
            setError(true);
          }
        };
    
        checkAdminStatus();
      }, []);

      if (!isAdmin) {
        navigate("/error");
        return null;
      }

    if (error) {
        navigate('/error');
        return null;
    }

    return (
    <div className='viewDishPage'>
        <NavbarComponent isAdmin={isAdmin}/>
        <ViewCard isAdmin={isAdmin}/>
        <Footer/>
    </div>
    );
}

export default ViewDishAdminPage;
