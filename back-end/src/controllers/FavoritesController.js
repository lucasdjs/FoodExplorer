import { insertFavorite, getFavorites, removeFavorite } from "../services/FavoritesService.js";
import { getFavoriteDishes } from "../services/GetDishService.js"

export const addFavorite = async (req, res) => {
  try {
    const { userId, mealId } = req.body;
    await insertFavorite(userId, mealId);
    res.status(201).json({ message: 'Favorito adicionado com sucesso!' });

  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
};

export const getFavoritesByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const favorites = await getFavorites(userId);
        res.status(200).json(favorites);
    } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        res.status(500).json({ error: "Erro ao buscar favoritos" });
    }
};

export const getFavoriteDishByIds = async (req, res) => {
  const { favoriteIds } = req.query;
  console.log(favoriteIds)

  try {
      const dishes = await getFavoriteDishes(favoriteIds);
      res.json(dishes);
  } catch (error) {
      console.error("Error fetching favorite dishes:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeFavoriteById = async (req, res) => {
  const { userId } = req.params;
  const { favoriteId } = req.body;

  try {
    await removeFavorite(userId, favoriteId);
    res.status(204).end();
  } catch (error) {
    console.error("Error removing from favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};