import { insertFavorite } from "../services/FavoritesService.js";

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