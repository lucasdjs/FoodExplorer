import {getAllDish, getAllCategories, getDishById } from '../services/GetDishService.js'

export const getAllDishController = async (req, res) => {
    try {
      const meals = await getAllDish();
      res.json(meals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

 export const getCategories = async (req, res) => {
  try {
    const meals = await getAllCategories();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const dish = await getDishById(id);

    if (!dish) {
      return res.status(404).json({ error: 'Prato não encontrado' });
    }

    res.json(dish);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};