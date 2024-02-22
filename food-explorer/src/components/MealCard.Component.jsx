import React, { useState, useEffect } from "react";
import "../Styles/Card.css";
import { Link } from "react-router-dom";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const MealCard = ({ meal, isAdmin }) => {
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

  const [quantidade, setQuantidade] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const userId = getUserIdFromToken();

  useEffect(() => {
    if (!isAdmin) {
      const checkFavorite = async () => {
        if (userId) {
          try {
            const response = await axios.get(
              `http://localhost:3000/favorites/${userId}`
            );
            const favorites = response.data;
            setIsFavorite(favorites.some(favorite => favorite.mealId === meal.id));
          } catch (error) {
            console.error("Erro ao verificar favoritos:", error);
          }
        }
      };
  
      checkFavorite();
    }
  }, [isAdmin, userId, meal.id]);


  const incrementarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const decrementarQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const addFavorites = async (mealId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/favorites",
        {
          userId: userId,
          mealId: mealId,
        }
      );
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Erro ao adicionar aos favoritos:", error);
    }
  };

  const addOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/insertOrder",
        {
          dishId: meal.id,
          userId: userId,
          price: meal.price,
          quantity: quantidade,
        }
      );
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Erro ao adicionar aos favoritos:", error);
    }
  };

  return (
    <div className="meal-card">
      {isAdmin && (
        <div className="edit-icon">
          <Link to={`/home/admin/editdish/${meal.id}`}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </Link>
        </div>
      )}
      {!isAdmin && (
        <div className="favorite-icon" id="favoriteIcon">
          <button onClick={() => addFavorites(meal.id)}>
            <FontAwesomeIcon
              icon={isFavorite ? faHeartSolid : faHeart}
              style={{ color: isFavorite ? "red" : "white" }}
            />
          </button>
        </div>
      )}
      <Link
        to={
          isAdmin
            ? `/home/admin/viewdish/${meal.id}`
            : `/home/user/viewdish/${meal.id}`
        }
      >
        <img src={`http://localhost:3000/uploads/${meal.image}`} alt="Meal" />
        <h3>{meal.name}</h3>
      </Link>
      <p id="description">{meal.description}</p>
      <p id="price">R${parseFloat(meal.price).toFixed(2)}</p>

      {!isAdmin && (
        <div className="quantity">
          <button onClick={decrementarQuantidade}>-</button>
          <span>{quantidade}</span>
          <button onClick={incrementarQuantidade}>+</button>
          <button id="incluir" onClick={addOrder}>incluir</button>
        </div>
      )}
    </div>
  );
};

export default MealCard;
