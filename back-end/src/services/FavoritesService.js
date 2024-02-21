import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

export const insertFavorite = async (userId, mealId) => {
    await db('favoriteDish').insert({ userId, mealId });
};

export const getFavorites = async (userId) => {
    try {
        const favorites = await db('favoriteDish').select('mealId').where('userId', userId);
        return favorites;
    } catch (error) {
        throw new Error("Erro ao buscar favoritos no banco de dados" + error);
    }
};

export const removeFavorite = async (userId, mealId) => {
    try {
        await db('favoriteDish').where({ userId, mealId }).del();
        console.log(`Favorite removed for user ${userId} and meal ${mealId}`);
        return true;
    } catch (error) {
        console.error("Error removing favorite:", error);
        throw error;
    }
};