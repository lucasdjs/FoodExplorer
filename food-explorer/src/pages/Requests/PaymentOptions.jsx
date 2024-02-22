// PaymentOptions.jsx
import React from "react";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PixIcon from "../../components/PixIcon";
import QRCode from "qrcode.react";
import { StyledButton } from "../../components/Button.styled";
import InputMask from "react-input-mask";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const PaymentOptions = ({
  showPixQRCode,
  showCreditForm,
  showPaymentPending,
  handlePixClick,
  handleCreditClick,
  handlePaymentSubmit,
  cardNumber,
  expirationDate,
  cvc,
  setCardNumber,
  setExpirationDate,
  setCvc,
  validateCardInfo,
  showPaymentAprove,
  showPaymentDelivery,
}) => {
  return (
    <div className="col-md-6 mb-4">
      <h2>Pagamento</h2>
      <div className="row">
        <div className="col-6 cardPayment">
          <button
            id="buttonPix"
            className={showPixQRCode ? "selected" : ""}
            onClick={handlePixClick}
            disabled={
              showPaymentPending || showPaymentAprove || showPaymentDelivery
            }
          >
            <PixIcon /> PIX
          </button>
        </div>
        <div className="col-6 cardPayment">
          <button
            className={showCreditForm ? "selected" : ""}
            onClick={handleCreditClick}
            disabled={
              showPaymentAprove || showPaymentDelivery || showPaymentPending
            }
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
            <form onSubmit={handlePaymentSubmit}>
              <InputMask
                mask="9999 9999 9999 9999"
                maskPlaceholder=""
                placeholder="Número do cartão"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <InputMask
                mask="99/99"
                maskPlaceholder=""
                placeholder="Validade"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
              />
              <InputMask
                mask="999"
                maskPlaceholder=""
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
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

        {showPaymentAprove && (
          <div className="row detailsPayment">
            <div className="text-center awaitPayment">
              <FontAwesomeIcon icon={faCheck} size="7x" color="#616161" />
              <p>Pagamento Aprovado!</p>
            </div>
          </div>
        )}

        {showPaymentDelivery && (
          <div className="row detailsPayment">
            <div className="text-center awaitPayment">
             
              <p>Pedido entregue!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
