import {getAllDish} from '../services/GetDishService.js'

export const getAllDishController = async (req, res) => {
    try {
      const meals = await getAllDish();
      res.json(meals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };