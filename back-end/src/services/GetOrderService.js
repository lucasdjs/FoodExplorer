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

export const getOrderFinishById = async (orderId) => {
  try {
    const order = await db('orderFinish').where({ id: orderId }).first();
    return order;
  } catch (error) {
    console.error('Erro ao buscar a ordem pelo ID:', error);
    throw error;
  }
};

export const getOrderFinishByUserId = async (userId) => {
  try {
    const orders = await db('orderFinish').where({ userId: userId });
    return orders;
  } catch (error) {
    console.error('Erro ao buscar a ordem pelo ID:', error);
    throw error;
  }
};

export const getOrderFinish = async () => {
  try {
    const orders = await db('orderFinish');
    return orders;
  } catch (error) {
    console.error('Erro ao buscar a ordem pelo ID:', error);
    throw error;
  }
};
