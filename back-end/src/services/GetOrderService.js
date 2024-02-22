import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

export const getOrderById = async (id) => {
    try {
        const orders = await db('Order')
            .join('Dish', 'Order.dishId', '=', 'Dish.id')
            .select('Order.*', 'Dish.*')
            .where('Order.userId', id);
        return orders;
    } catch (error) {
        throw new Error('Erro ao buscar pedido no banco de dados');
    }
};
