// OrderSummary.jsx
import React from "react";

const OrderSummary = ({ orders, handleDelete, calculateTotal, showDeleteButtons  }) => {
  return (
    <div className="col-md-6 mb-4">
      <h2>Meu Pedido</h2>
      {orders.map((dish) => (
        <div className="row" key={dish.id}>
          <div className="col-md-2">
            <img
              src={`http://localhost:3000/uploads/${dish.image}`}
              alt="Meal"
              className="img-fluid"
            />
          </div>
          <div className="col">
            <p>
              {dish.quantity} x {dish.name} <span>R$ {dish.total.toFixed(2)}</span>
            </p>
            {showDeleteButtons && ( // Oculta o botão de exclusão quando o pagamento estiver pendente
              <button id="deleteOrder" onClick={() => handleDelete(dish)}>
                Excluir
              </button>
            )}
          </div>
        </div>
      ))}
      <p>Total: R$ {calculateTotal()}</p>
    </div>
  );
};

export default OrderSummary;
