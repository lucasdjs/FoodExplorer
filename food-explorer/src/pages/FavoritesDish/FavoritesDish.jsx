import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../../components/Navbar.Component";
import Footer from "../../components/Footer.Component";
import axios from "../../axiosConfig";
import "./FavoritesDish.css";

const FavoritesDish = ({ isAdmin }) => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [favoriteDishes, setFavoriteDishes] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/favorites/${id}`
        );

        if (response && response.data) {
          setFavorites(response.data);

          console.log(response.data)
          const favoriteIds = response.data.map((favorite) => favorite.mealId);
          await fetchFavoriteDishes(favoriteIds);
        } else {
          console.log("Response or response data is empty:", response);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [id]);

  // const removeFromFavorites = async (favoriteId) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/deleteFavoriteById/${id}`, {
  //       data: {favoriteId }
  //     });
      
  //     const updatedFavorites = favorites.filter(favorite => favorite.mealId !== favoriteId);
  //     setFavorites(updatedFavorites);
  //   } catch (error) {
  //     console.error("Error removing from favorites:", error);
  //   }
  // };

  const fetchFavoriteDishes = async (favoriteIds) => {
    try {
      const response = await axios.get(`http://localhost:3000/getDishesByIds`, {
        params: {
          favoriteIds: favoriteIds
        },
      });
      if (response && response.data) {
        console.log(response.data)
        setFavoriteDishes(response.data);
      } else {
        console.log("Response or response data is empty:", response);
      }
    } catch (error) {
      console.error("Error fetching favorite dishes:", error);
    }
  };

  return (
    <div className="favoritesDish">
      <NavbarComponent isAdmin={isAdmin} />
      <div className="container">
        <h1>Meus favoritos</h1>

        <div className="row favorites">
          {favoriteDishes.map((dish) => (
            <div className="col-md-4 mb-4" key={dish.id}>
              <div className="row">
                <div className="col-md-3 col-xs-3 favoritesCard">
                  <img
                    src={`http://localhost:3000/uploads/${dish.image}`}
                    alt="Meal"
                    className="img-fluid"
                  />
                </div>
                <div className="col">
                  <h5 className="card-title">{dish.name}</h5>
                  <button
                    className="btn"
                  
                  >
                    Remover dos favoritos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesDish;
