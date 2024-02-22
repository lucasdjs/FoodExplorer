import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/Navbar.Component";
import Footer from "../../components/Footer.Component";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Orders.css";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PixIcon from "../../components/PixIcon";
import QRCode from "qrcode.react";
import { StyledButton } from "../../components/Button.styled";

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
  const [showPayment, setShowPayment] = useState(false); // Estado para controlar a exibição da seção de pagamento

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
      setShowPayment(true); // Mostrar a seção de pagamento ao clicar em Avançar em dispositivos móveis
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

  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <div className="row orders">
          {!showPayment && ( // Renderizar seção de "Meu Pedido" se showPayment for falso
            <div className={isMobile ? "col-md-12 mb-4" : "col-md-6 mb-4"}>
              <h2>Meu Pedido</h2>
              {orders.map((dish) => (
                <div className="row">
                  <div className="col-md-2">
                    <img
                      src={`http://localhost:3000/uploads/${dish.image}`}
                      alt="Meal"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col">
                    <p>
                      {dish.quantity} x {dish.name}{" "}
                      <span>R$ {dish.total.toFixed(2)}</span>
                    </p>
                    <button id="deleteOrder">Excluir</button>
                  </div>
                </div>
              ))}
              {isMobile && ( // Renderizar botão "Avançar" apenas em dispositivos móveis
                <div className="text-center">
                  <StyledButton onClick={handleAdvanceClick}>Avançar</StyledButton>
                </div>
              )}
            </div>
          )}

          {(showPayment || !isMobile) && ( // Renderizar a seção de pagamento se showPayment for verdadeiro ou se não for um dispositivo móvel
            <div className="col-md-6 mb-4">
              <h2>Pagamento</h2>
              <div className="row">
                <div className="col-6 cardPayment">
                  <button
                    id="buttonPix"
                    className={showPixQRCode ? "selected" : ""}
                    onClick={handlePixClick}
                  >
                    <PixIcon /> PIX
                  </button>
                </div>
                <div className="col-6 cardPayment">
                  <button
                    className={showCreditForm ? "selected" : ""}
                    onClick={handleCreditClick}
                  >
                    <FontAwesomeIcon icon={faCreditCard} />
                    Crédito
                  </button>
                </div>

                {showPixQRCode && (
                  <div className="row detailsPayment">
                    <QRCode
                      value="informacao_do_qr_code_para_pix"
                      fgColor="#888888"
                      bgColor="#000000"
                      size={180}
                    />
                  </div>
                )}

                {showCreditForm && (
                  <div className="row detailsPayment">
                    <form>
                      <input type="text" placeholder="Número do cartão" />
                      <input type="text" placeholder="Validade" />
                      <input type="text" placeholder="CVC" />
                      <StyledButton type="submit">Finalizar pagamento</StyledButton>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
