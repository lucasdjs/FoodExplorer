import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

export const getAllDish = async () => {
  try {
    const dish = await db('Dish');
    return dish;
  } catch (error) {
    throw new Error('Erro ao buscar refeições no banco de dados');
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await db('Dish').select('category');
    return categories;
  } catch (error) {
    throw new Error('Erro ao buscar refeições no banco de dados');
  }
};

export const getFavoriteDishes = async (favoriteIds) => {
  try {
    console.log("Favorite IDs:", favoriteIds);
    
    const dishes = await db('dish')
    .select('dish.*')
    .join('favoriteDish', 'dish.id', 'favoriteDish.mealId');
    
    console.log("Dishes:", dishes);
    return dishes;
  } catch (error) {
    throw error;
  }
};


export const getDishById = async (id) => {
  try {
    const dish = await db('Dish').where('id', id).first();
    return dish;
  } catch (error) {
    throw new Error('Erro ao buscar prato no banco de dados');
  }
};