import {getAllDish, getAllCategories, getDishById } from '../services/GetDishService.js'
import {editDish} from '../services/EditDishService.js'
import { deleteDish } from '../services/DeleteDishService.js'

export const getAllDishController = async (req, res) => {
    try {
      const meals = await getAllDish();
      res.json(meals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const editById = async (req, res) => {
    const { id } = req.params;
    const dishData = req.body;
    try {
      const updatedDish = await editDish(id, dishData);
      res.status(200).json(updatedDish);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
     const response =  await deleteDish(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
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