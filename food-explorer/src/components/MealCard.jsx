import React, { useState } from 'react';
import '../Styles/Card.css'

const MealCard = ({ meal }) => {

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
      <img src={meal.image} alt="Meal" />
      <h3>{meal.name}</h3>
      <p>Price: ${meal.price.toFixed(2)}</p>
      <div className="quantity">
        <button onClick={decrementarQuantidade}>-</button>
        <span>{quantidade}</span>
        <button onClick={incrementarQuantidade}>+</button>
      </div>
    </div>
  );
};

export default MealCard;
