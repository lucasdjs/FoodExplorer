import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyledButton } from "./Button.styled";
import { Link } from "react-router-dom";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import "../Styles/ViewDish.css";

const ViewCard = ({ isAdmin }) => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [precoItem, setPrecoItem] = useState(0);

  const incrementarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const decrementarQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(`/getDishById/${id}`);
        setDish(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do prato:", error);
      }
    };
    fetchDish();
  }, [id]);

  useEffect(() => {
    if (dish) {
      const price = parseFloat(dish.price);
      setPrecoItem(price * quantidade);
    }
  }, [quantidade, dish]);

  if (!dish) {
    return <div>Carregando...</div>;
  }

  var ingredientes = dish.ingredients.replace(/[\[\]"]/g, "").split(",");
  var ingredientesFormatados = ingredientes.map(function (ingrediente) {
    return ingrediente.split(" ");
  });

  return (
    <div className="container">
      <div className="row mb-3 voltar">
        <Link to={isAdmin ? "/home/admin" : "/home/user"}>
          {" "}
          <FontAwesomeIcon icon={faLessThan} /> Voltar
        </Link>
      </div>
      <div className="row">
        <div className="col-4 imgView">
          <img src={`http://localhost:3000/uploads/${dish.image}`} alt="Meal" />
        </div>
        <div className="col dishInformation">
          <h2>{dish.name}</h2>
          <p className="description">{dish.description}</p>
          <div className="tags">
            {ingredientesFormatados.map((ingrediente, index) => (
              <span key={index}>{ingrediente}</span>
            ))}
          </div>
          <div className="quantity">
            {!isAdmin && (
              <>
                <button className="decrement" onClick={decrementarQuantidade}>
                  -
                </button>
                <span>{quantidade}</span>
                <button onClick={incrementarQuantidade}>+</button>
              </>
            )}
            {isAdmin ? (
              <Link to={`http://localhost:5173/home/admin/editdish/${id}`}>
                <StyledButton id="incluir">Editar Prato</StyledButton>
              </Link>
            ) : (
              <StyledButton id="incluir">
                Incluir - R${precoItem.toFixed(2)}
              </StyledButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
