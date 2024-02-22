import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/Navbar.Component";
import Footer from "../../components/Footer.Component";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Orders.css";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
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
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentPending, setShowPaymentPending] = useState(false);

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

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    setShowCreditForm(false);
    setShowPixQRCode(false);
    setShowPaymentPending(true);
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
          {!showPayment && (
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
                    <button id="deleteOrder" onClick={() => handleDelete(dish)}>
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
              <p>Total: R$ {calculateTotal()}</p>

              {isMobile && (
                <div className="text-center" id="buttonAvancar">
                  <StyledButton onClick={handleAdvanceClick}>
                    Avançar
                  </StyledButton>
                </div>
              )}
            </div>
          )}

          {(showPayment || !isMobile) && (
            <div className="col-md-6 mb-4">
              <h2>Pagamento</h2>
              <div className="row">
                <div className="col-6 cardPayment">
                  <button
                    id="buttonPix"
                    className={showPixQRCode ? "selected" : ""}
                    onClick={handlePixClick}
                    disabled={showPaymentPending}
                  >
                    <PixIcon /> PIX
                  </button>
                </div>
                <div className="col-6 cardPayment">
                  <button
                    className={showCreditForm ? "selected" : ""}
                    onClick={handleCreditClick}
                    disabled={showPaymentPending}
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
                      <StyledButton type="submit" onClick={handlePaymentSubmit}>
                        Finalizar pagamento
                      </StyledButton>
                    </form>
                  </div>
                )}

                {showPaymentPending && (
                  <div className="row detailsPayment">
                    <div className="text-center awaitPayment">
                      <FontAwesomeIcon icon={faClock} size="7x" color="#616161" />
                      <p>Aguardando pagamento no caixa</p>
                    </div>
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
