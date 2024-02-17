import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent';
import SlideShow from '../../components/SlideShow';
import Footer from '../../components/Footer';
import HomePage from '../../pages/CardsMeals/HomePage';
import axios from "../../axiosConfig";

const AdminHome = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
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
    return <div>Carregando...</div>;
  }

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className='home'>
      <NavbarComponent />
      <SlideShow />
      <HomePage />
      <Footer />
    </div>
  );
};

export default AdminHome;
