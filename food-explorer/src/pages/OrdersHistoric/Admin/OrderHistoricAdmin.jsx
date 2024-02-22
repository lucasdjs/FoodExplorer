import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../components/Navbar.Component";
import Footer from "../../../components/Footer.Component";
import axios from "axios";
import "../OrderHistoric.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faBoxOpen,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const OrderHistoryPageAdmin = () => {
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
  const [isMobile, setIsMobile] = useState(false);
  const userId = getUserIdFromToken();

  const cleanItemString = (itemString) => {
    const cleanedString = itemString.replace(/[\[\]"]+/g, "");
    const itemsArray = cleanedString.split(",");
    return itemsArray.join(", ");
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/updateOrderStatus/${orderId}`, {
        status: newStatus,
      });
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getOrdersFinish`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();

    // Detectando se é um dispositivo móvel
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust as needed
    };
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="orderHistoric">
      <NavbarComponent isAdmin={true} />
      <div className="container">
        <h2>Histórico de Pedidos</h2>
        {isMobile ? (
          <div className="cardContainer">
            {orders.map((order) => (
              <div key={order.id} className="orderCard">
             
                <div>
                  <span>Código:</span>000{order.id}  {order.created_at}
                </div>
                <div>
                 {cleanItemString(order.itens)}
                </div>
                <div className="statusContainer">
                  {getStatusIcon(order.status)}
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="pendente">Pendente</option>
                    <option value="preparando">Preparando</option>
                    <option value="entregue">Entregue</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                    <td>
                      {getStatusIcon(order.status)}
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="pendente">Pendente</option>
                        <option value="preparando">Preparando</option>
                        <option value="entregue">Entregue</option>
                      </select>
                    </td>
                    <td>000{order.id}</td>
                    <td>{cleanItemString(order.itens)}</td>
                    <td>{order.created_at}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistoryPageAdmin;
