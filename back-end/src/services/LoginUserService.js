import bcrypt from 'bcrypt';
import { openDb } from "../database/db.js";

export async function LoginUser(email, senha) {
    try {
        const db = await openDb();
        const user = await db.get("SELECT * FROM User WHERE Email = ?", [email]);
        if (!user) {
            return null;
        }
console.log(senha)
console.log(user.Senha)
        const senhaCorrespondente = await bcrypt.compare(senha, user.Senha);

        if (!senhaCorrespondente) {
            return null;
        }
        return {
            id: user.Id,
            nome: user.Nome,
            email: user.Email,
            admin: user.Admin
        };
    } catch (error) {
       
        throw error;
    }
}

