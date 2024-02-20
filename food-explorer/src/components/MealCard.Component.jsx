import React, { useState } from 'react';
import '../Styles/Card.css'
import { Link } from 'react-router-dom';

const MealCard = ({ meal, isAdmin }) => {

  const [quantidade, setQuantidade] = useState(1);
  const incrementarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };
  
  const decrementarQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };
  return (
    
    <div className="meal-card">
       {isAdmin ? (
        <Link to={`/home/admin/viewdish/${meal.id}`}>
          <img src={`http://localhost:3000/uploads/${meal.image}`} alt="Meal" />
          <h3>{meal.name}</h3>
        </Link>
      ) : (
        <Link to={`/home/user/viewdish/${meal.id}`}>
          <img src={`http://localhost:3000/uploads/${meal.image}`} alt="Meal" />
          <h3>{meal.name}</h3>
        </Link>
      )}
      <p id='description'>{meal.description}</p>
      <p id='price'>Price: ${parseFloat(meal.price).toFixed(2)}</p>

      <div className="quantity">
        <button onClick={decrementarQuantidade}>-</button>
        <span>{quantidade}</span>
        <button onClick={incrementarQuantidade}>+</button>
        <button id='incluir'>incluir</button>
      </div>
  
    </div>
  );
};

export default MealCard;
