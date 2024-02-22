import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

export const createOrderService = async (order) =>{
    try {
        const total = order.price * order.quantity;

        await db('order').insert({
            dishId: order.dishId,
            userId: order.userId,
            price: order.price,
            quantity: order.quantity,
            total: total
        });
        return true;

    } catch (error) {
        console.error("Erro ao inserir o prato:", error);
        return false;
    }
}
