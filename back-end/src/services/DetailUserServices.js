import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

export class DetailUserService {
  async execute(userId) {
    const user = await db('User').where('Id', userId).first();

    return {
      id: user.Id,
      nome: user.Nome,
      email: user.Email,
      isAdmin: user.Admin
    };
  }
}
