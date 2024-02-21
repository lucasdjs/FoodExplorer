import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

export const insertFavorite = async (userId, mealId) => {
  await db('favoriteDish').insert({ userId, mealId });
};

export const getFavorites = async (userId) => {
    try {
        const favorites = await db('favoriteDish').select('mealId').where('userId', userId);
        console.log(favorites)
        return favorites;
    } catch (error) {
        throw new Error("Erro ao buscar favoritos no banco de dados" + error);
    }
};