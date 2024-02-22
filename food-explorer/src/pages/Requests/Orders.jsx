// Orders.jsx
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/Navbar.Component";
import Footer from "../../components/Footer.Component";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Orders.css";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";

const Orders = () => {
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

  const [orders, setOrders] = useState([]);
  const userId = getUserIdFromToken();
  const [showPixQRCode, setShowPixQRCode] = useState(false);
  const [showCreditForm, setShowCreditForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentPending, setShowPaymentPending] = useState(false);
  const [showPaymentAprove, setShowPaymentAprove] = useState(false);
  const [showPaymentDelivery, setShowPaymentDelivery] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [isCardInfoValid, setIsCardInfoValid] = useState(false);
  const [idOrder, setIdOrder] = useState(localStorage.getItem("orderId"));
  const [order, setOrder] = useState(null);
  const [showDeleteButtons, setShowDeleteButtons] = useState(true);

  useEffect(() => {
    if (showPaymentAprove || showPaymentDelivery || showPaymentPending) {
      setShowDeleteButtons(false);
    } else {
      setShowDeleteButtons(true);
    }
  }, [showPaymentAprove, showPaymentDelivery, showPaymentPending]);

  const validateCardInfo = () => {
    return (
      cardNumber.trim() !== "" &&
      expirationDate.trim() !== "" &&
      cvc.trim() !== ""
    );
  };

  useEffect(() => {
    setIsCardInfoValid(validateCardInfo());
  }, [cardNumber, expirationDate, cvc]);

  const handleDelete = async (dish) => {
    if (window.confirm("Tem certeza que deseja excluir este prato?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/deleteOrderById`,
          {
            data: { id: dish.id },
          }
        );
        if (response.status === 200) {
          window.location.reload();
        } else {
          console.log("Erro ao excluir pedido.");
        }
      } catch (error) {
        console.error("Erro ao excluir o prato:", error);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("orderId", idOrder);
  }, [idOrder]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!idOrder) return;
        const response = await axios.get(
          `http://localhost:3000/getOrderFinishById/${idOrder}`
        );
        setOrder(response.data);
        let status = response.data.status;
        setShowPaymentPending(status === "pendente");
        setShowPaymentAprove(status === "preparando");
        setShowPaymentDelivery(status === "entregue");
        setShowPayment(status !== "pendente" && status !== "preparando" && status !== "entregue");
      } catch (error) {
        console.error("Erro ao buscar a ordem:", error);
      }
    };
    fetchOrder();
  }, [idOrder]);

  const handlePixClick = () => {
    setShowPixQRCode(true);
    setShowCreditForm(false);
  };

  const handleCreditClick = () => {
    setShowPixQRCode(false);
    setShowCreditForm(true);
  };

  const handleAdvanceClick = () => {
    if (isMobile) {
      setShowPayment(true);
    }
  };

  const handlePaymentSubmit = async (event) => {
    if (validateCardInfo()) {
      event.preventDefault();
      setShowCreditForm(false);
      setShowPixQRCode(false);
      setShowPaymentPending(true);

      const userId = getUserIdFromToken();
      const total = calculateTotal();
      const itens = orders.map((dish) => `${dish.quantity} x ${dish.name}`);

      const data = {
        userId,
        total,
        itens,
        status: "pendente",
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/insertOrderFinish",
          data
        );

        setIdOrder(response.data.id);
        console.log("Resposta do servidor:", response.data);
      } catch (error) {
        console.error("Erro ao enviar os dados do pedido:", error);
      }

      return;
    } else {
      alert("Por favor, preencha todos os campos do cartão.");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getOrderByUserId/${userId}`
        );
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const calculateTotal = () => {
    let total = 0;
    orders.forEach((dish) => {
      total += dish.total;
    });
    return total.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };

  return (
    <div className="orderDisplay">
      <NavbarComponent />
      <div className="container">
        <div className="row orders">
          <OrderSummary
            orders={orders}
            handleDelete={handleDelete}
            calculateTotal={calculateTotal}
            showPaymentPending={showPaymentPending}
            showDeleteButtons={showDeleteButtons} 
          />
          <PaymentOptions
            showPixQRCode={showPixQRCode}
            showCreditForm={showCreditForm}
            showPaymentPending={showPaymentPending}
            handlePixClick={handlePixClick}
            handleCreditClick={handleCreditClick}
            handlePaymentSubmit={handlePaymentSubmit}
            cardNumber={cardNumber}
            expirationDate={expirationDate}
            cvc={cvc}
            setCardNumber={setCardNumber}
            setExpirationDate={setExpirationDate}
            setCvc={setCvc}
            validateCardInfo={validateCardInfo}
            isMobile={isMobile}
            handleAdvanceClick={handleAdvanceClick}
            showPayment={showPayment}
            showPaymentAprove={showPaymentAprove}
            showPaymentDelivery={showPaymentDelivery}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
