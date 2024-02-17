import { openDb } from "../database/db.js";
import bcrypt from 'bcrypt';

async function hashPassword(password) {
    const saltRounds = 8;
    return await bcrypt.hash(password, saltRounds);
}

export async function CreateUser(user) {
    try {
        const db = await openDb();
        const hashedPassword = await hashPassword(user.senha);

        db.run("INSERT INTO User (Nome, Email, Senha, Admin) VALUES (?, ?, ?, ?)", [user.nome, user.email, hashedPassword, user.admin], function (err) {
            if (err) {
                console.error("Erro ao inserir usuário:", err);
                return false;
            }
            console.log("Usuário inserido com sucesso.");
            return true;
        });
    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
        return false;
    }
}

export async function isUserRegistered(email) {
    const db = await openDb();
    const userRegistered = await db.get("SELECT * FROM User WHERE Email = ?", [email]);
    return userRegistered ? true : false;
}

