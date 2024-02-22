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