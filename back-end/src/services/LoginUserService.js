import bcrypt from 'bcrypt';
import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

export async function LoginUser(email, senha) {
    try {
        const user = await db('User').where('Email', email).first();

        if (!user) {
            return false;
        }

        const passwordMatch = await bcrypt.compare(senha, user.Senha);

        if (!passwordMatch) {
            return false;
        }

        return user;
    } catch (error) {
        throw error;
    }
}
