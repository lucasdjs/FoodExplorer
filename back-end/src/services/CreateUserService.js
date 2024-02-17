import bcrypt from 'bcrypt';
import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

async function hashPassword(password) {
    const saltRounds = 8;
    return await bcrypt.hash(password, saltRounds);
}

export async function CreateUser(user) {
    try {
        const hashedPassword = await hashPassword(user.senha);+
        await db('User').insert({
            Nome: user.nome,
            Email: user.email,
            Senha: hashedPassword,
            Admin: user.admin
        });
        return true;

    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
        return false;
    }
}

export async function isUserRegistered(email) {

     const userRegistered = await db('User').where('Email', email).first();
     return userRegistered ? true : false;
}

