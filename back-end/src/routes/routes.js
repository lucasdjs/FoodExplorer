import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../components/Navbar.Component";
import Footer from "../../../components/Footer.Component";
import axios from "axios";
import "../OrderHistoric.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faBoxOpen, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

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
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado para controlar o status selecionado
  const userId = getUserIdFromToken();

  const cleanItemString = (itemString) => {
    const cleanedString = itemString.replace(/[\[\]"]+/g, "");
    const itemsArray = cleanedString.split(",");
    return itemsArray.join(", ");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getOrdersFinish`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId) => {
    try {
      // Enviar requisição para atualizar o status no banco de dados
      await axios.put(`http://localhost:3000/updateOrderStatus/${orderId}`, {
        status: selectedStatus,
      });
      // Atualizar localmente os dados após a atualização bem-sucedida
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: selectedStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

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
              <th>Atualizar Status</th> {/* Nova coluna para atualização do status */}
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
                  <td>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="">Selecione um status</option>
                      <option value="pendente">Pendente</option>
                      <option value="preparando">Preparando</option>
                      <option value="entregue">Entregue</option>
                    </select>
                    <button onClick={() => handleStatusChange(order.id)}>
                      Atualizar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistoryPageAdmin;
