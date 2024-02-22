import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/Navbar.Component";
import SlideShow from "../../components/SlideShow";
import Footer from "../../components/Footer.Component";
import HomePage from "../../pages/CardsMeals/HomePage";
import axios from "../../axiosConfig";

const AdminHome = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token não encontrado");
        }

        const response = await axios.get("http://localhost:3000/userInfo", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { isAdmin } = response.data;
        setIdUser(response.data.id)
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error("Erro ao verificar o status de administrador:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);


  if (!isAdmin || isAdmin === null || isAdmin === undefined) {
    navigate("/error");
    return null;
  }

  if (error) {
    navigate("/error");
    return null;
  }

  if (loading) {
    return (
      <div class="spinner-container">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }  

  return (
    <div className="home">
      <NavbarComponent isAdmin={isAdmin} idUser={idUser} />
      <SlideShow />
      <HomePage isAdmin={isAdmin} />
      <Footer />
    </div>
  );
};

export default AdminHome;
