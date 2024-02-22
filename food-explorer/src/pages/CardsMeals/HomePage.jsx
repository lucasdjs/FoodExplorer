import React from 'react';
import MealCarousel from '../../components/MealCarousel.Component';

const HomePage = ({ isAdmin }) => {
  return (
    <div className="container">
      <MealCarousel isAdmin = {isAdmin} />
    </div>
  );
};

export default HomePage;
