import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/Navbar.Component";
import Footer from "../../components/Footer.Component";
import axios from "axios";
import './OrderHistoric.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faBoxOpen, faCheckCircle } from "@fortawesome/free-solid-svg-icons";


const OrderHistoryPage = ({idAdmin}) => {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "pendente":
        return <FontAwesomeIcon icon={faClock} color="red" />;
      case "preparando":
        return <FontAwesomeIcon icon={faBoxOpen} color="yellow" />;
      case "entregue":
        return <FontAwesomeIcon icon={faCheckCircle} color="green" />;
      default:
        return null;
    }
  };

  const [orders, setOrders] = useState([]);
  const userId = getUserIdFromToken();

  const cleanItemString = (itemString) => {
   const cleanedString = itemString.replace(/[\[\]"]+/g, '');
   const itemsArray = cleanedString.split(',');
   return itemsArray.join(', ');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getOrderFinishByUserId/${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orderHistoric">
      <NavbarComponent />
      <div className="container">
        <h2>Histórico de Pedidos</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Código</th>
              <th>Detalhamento</th>
              <th>Data e Hora</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) &&
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{getStatusIcon(order.status)}</td>
                  <td>{order.id}</td>
                  <td>{cleanItemString(order.itens)}</td>
                  <td>{order.created_at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
