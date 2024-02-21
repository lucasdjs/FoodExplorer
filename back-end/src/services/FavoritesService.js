import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

export const insertFavorite = async (userId, mealId) => {
  await db('favoriteDish').insert({ userId, mealId });
};