import NavbarComponent from '../../components/Navbar.Component';
import Footer from '../../components/Footer.Component';
import DishForm from '../../components/Dish.Component'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "../../axiosConfig";

const EditDish = () => {

  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(true);

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

        const { isAdmin } = response.data;
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error('Erro ao verificar o status de administrador:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return <div class="spinner-container">
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>
  }

  if (!isAdmin) {
    navigate('/error');
    return null;
  }

  return (
    <div className='newdish'>
        <NavbarComponent isAdmin={isAdmin} />
        <DishForm isEditing={true}/>
        <Footer />
    </div>
  );
};

export default EditDish;
