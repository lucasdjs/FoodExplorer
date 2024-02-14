import React, { useState } from 'react';
import { StyledButton } from "./Button.styled";

const MealCarousel = ({ meals }) => {
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleNext = () => {
    setSelectedMealIndex((prevIndex) =>
      prevIndex === meals.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setSelectedMealIndex((prevIndex) =>
      prevIndex === 0 ? meals.length - 1 : prevIndex - 1
    );
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => prevQuantity + amount);
  };

  const handleInclude = () => {
    const selectedMeal = meals[selectedMealIndex];
    console.log(`Included ${quantity} of ${selectedMeal.name} in cart`);
    // Aqui você pode adicionar a lógica para adicionar o item ao carrinho
  };

  return (
    <div className="meal-carousel">
      <div className="meal-card">
        <img src={meals[selectedMealIndex].image} alt="Meal" />
        <h3>{meals[selectedMealIndex].name}</h3>
        <p>Valor: R$ {meals[selectedMealIndex].price.toFixed(2)}</p>
        <div className="quantity-selector">
          <StyledButton onClick={() => handleQuantityChange(-1)}>-</StyledButton>
          <span>{quantity}</span>
          <StyledButton onClick={() => handleQuantityChange(1)}>+</StyledButton>
        </div>
        <button onClick={handleInclude}>Incluir no Carrinho</button>
      </div>
      <div className="carousel-controls">
        <button onClick={handlePrev}>Anterior</button>
        <button onClick={handleNext}>Próximo</button>
      </div>
    </div>
  );
};

export default MealCarousel;
