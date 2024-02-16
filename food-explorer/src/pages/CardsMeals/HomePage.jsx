// HomePage.jsx
import React from 'react';
import MealCarousel from '../../components/MealCarousel';

import image1 from '../../assets/image1.png'; // Suponha que esta seja a importação correta da imagem

const meals = [
  {
    image: image1,
    name: 'Refeição 1',
    description: 'dsadsadsadsad',
    price: 10.99,
  },
  {
    image: image1,
    name: 'Refeição 2',
    description: 'dsadsadsadsad',
    price: 12.99,
  },
  {
    image: image1,
    name: 'Refeição 3',
    description: 'dsadsadsadsad',
    price: 15.99,
  },
  {
    image: image1,
    name: 'Refeição 4',
    description: 'dsadsadsadsad',
    price: 15.99,
  },
];

const HomePage = () => {
  return (
    <div className="container">
      <MealCarousel meals={meals} />
    </div>
  );
};

export default HomePage;
