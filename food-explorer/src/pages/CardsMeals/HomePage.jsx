import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import image1 from '../../assets/image1.png';

const meals = [
  {
    image: image1,
    name: 'Refeição 1',
    price: 10.99,
  },
  {
    image: image1,
    name: 'Refeição 2',
    price: 12.99,
  },
  {
    image: image1,
    name: 'Refeição 3',
    price: 15.99,
  },
];

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
  <div className='container'>
    <h3>Refeições</h3>
    <Slider {...settings}>
      {meals.map((meal, index) => (
        <div key={index}>
          <img src={meal.image} alt="Meal" />
          <h3>{meal.name}</h3>
          <p>Price: ${meal.price}</p>
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default HomePage;
