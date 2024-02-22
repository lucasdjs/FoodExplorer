import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

export const deleteOrder = async (id) => {
  try {
    await db('order')
      .where('id', id)
      .delete();
    return true;

  } catch (error) {
    throw new Error(`Erro ao editar o prato: ${error.message}`);
  }
}

export const updateOrderService = async (id, newStatus) => {
  try {
    await db('orderFinish')
      .where('id', id)
      .update({ status: newStatus });

    return true;

  } catch (error) {
    throw new Error(`Erro ao atualizar o status do pedido: ${error.message}`);
  }
}
