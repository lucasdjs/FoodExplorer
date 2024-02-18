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

  export const getAllCategories= async () => {
    try {
      const categories = await db('Dish').select('category');
      return categories;
    } catch (error) {
      throw new Error('Erro ao buscar refeições no banco de dados');
    }
  };