import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MealCard from "./MealCard";
import "../Styles/Carousel.css";

const MealCarousel = ({ meals }) => {
  const totalMeals = meals.length;
  const cardsToShow = Math.min(totalMeals, 4); // Mostrar no máximo 4 cartões

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: cardsToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(cardsToShow, 2),
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(cardsToShow, 2),
          slidesToScroll: 1,
        },
      },
    ],
  };

  const goToNextSlide = () => {
    sliderRef.slickNext();
  };

  const goToPrevSlide = () => {
    sliderRef.slickPrev();
  };

  let sliderRef;

  return (
    <div className="carousel-container">
      <h2>Refeições</h2>
      <div className="carousel">
        <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
          {meals.map((meal, index) => (
            <MealCard key={index} meal={meal} />
          ))}
        </Slider>
        <div className="overlay-left" onClick={goToPrevSlide}>
          {"<"}
        </div>
        <div className="overlay-right" onClick={goToNextSlide}>
          {">"}
        </div>
      </div>
    </div>
  );
};

export default MealCarousel;
