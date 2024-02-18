import {getAllDish, getAllCategories } from '../services/GetDishService.js'

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