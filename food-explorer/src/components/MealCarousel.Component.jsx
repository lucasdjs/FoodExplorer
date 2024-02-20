import React, { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MealCard from "./MealCard.Component";
import "../Styles/Carousel.css";
import axios from "axios";

const MealCarousel = ({isAdmin}) => {
  const [dishByCategory, setDishByCategory] = useState({});

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getDish");
        const dishes = response.data.reduce((acc, dish) => {
          const category = dish.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(dish);
          return acc;
        }, {});
        setDishByCategory(dishes);
      } catch (error) {
        console.error("Erro ao buscar refeições por categoria:", error);
      }
    };

    fetchDishes();
  }, []);

  const sliderRefs = useMemo(
    () =>
      Object.keys(dishByCategory).map(() => React.createRef()),
    [dishByCategory]
  );

  const goToNextSlide = (index) => {
    const sliderRef = sliderRefs[index]?.current;
    if (sliderRef) {
      sliderRef.slickNext();
    }
  };
  
  const goToPrevSlide = (index) => {
    const sliderRef = sliderRefs[index]?.current;
    if (sliderRef) {
      sliderRef.slickPrev();
    }
  };

  const renderCarousel = () => {
    return Object.entries(dishByCategory).map(([category, dishes], index) => {
      const totalDishes = dishes.length;
      const cardsToShow = Math.min(totalDishes, 4);

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

      return (
        <div key={index} className="carousel-container">
          <h2>{category}</h2>
          <div className="carousel">
            <Slider {...settings} ref={sliderRefs[index]}>
              {dishes.map((dish, dishIndex) => (
            <MealCard key={dishIndex} meal={dish} isAdmin={isAdmin}/>
              ))}
            </Slider>
            <div className="overlay-left" onClick={() => goToPrevSlide(index)}>
              {"<"}
            </div>
            <div className="overlay-right" onClick={() => goToNextSlide(index)}>
              {">"}
            </div>
          </div>
        </div>
      );
    });
  };

  return <>{renderCarousel()}</>;
};

export default MealCarousel;
