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

export const createOrderServiceFinish = async (order) =>{
    try {
        const itensJson = JSON.stringify(order.itens);

        const insertedOrderId = await db('orderFinish').insert({
            userId: order.userId,
            total: order.total,
            itens: itensJson,
            status: order.status
        }).returning('id');
        return insertedOrderId[0];

    } catch (error) {
        console.error("Erro ao inserir o prato:", error);
        return false;
    }
}
