import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyledButton } from "./Button.styled";
import { Link } from "react-router-dom";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import "../Styles/ViewDish.css";

const ViewCard = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);

  const [quantidade, setQuantidade] = useState(1);
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
        console.log(dish);
      } catch (error) {
        console.error("Erro ao buscar detalhes do prato:", error);
      }

      console.log(dish.ingredients)
    };
    fetchDish();
  }, [id]);

  if (!dish) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <div className="row mb-3 voltar">
        <Link to="/home/admin">
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
          <p className="tags">{dish.ingredients}</p>
          <div className="quantity">
            <button onClick={decrementarQuantidade}>-</button>
            <span>{quantidade}</span>
            <button onClick={incrementarQuantidade}>+</button>
            <StyledButton id="incluir">incluir</StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
