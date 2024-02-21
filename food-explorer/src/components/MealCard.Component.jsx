import React, { useState } from "react";
import "../Styles/Card.css";
import { Link } from "react-router-dom";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

const MealCard = ({ meal, isAdmin }) => {
  const [quantidade, setQuantidade] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

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
        "URL_DO_ENDPOINT_PARA_ADICIONAR_AOS_FAVORITOS",
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
              icon={isFavorite.includes(meal.id) ? faHeartSolid : faHeart} 
              style={{ color: isFavorite.includes(meal.id) ? 'red' : 'black', backgroundColor: isFavorite.includes(meal.id) ? 'red' : 'transparent', borderRadius: '50%' }} 
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
          <button id="incluir">incluir</button>
        </div>
      )}
    </div>
  );
};

export default MealCard;
