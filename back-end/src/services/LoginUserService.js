import bcrypt from 'bcrypt';
import { openDb } from "../database/db.js";

export async function LoginUser(email, senha) {
    try {
        const db = await openDb();
        const user = await db.get("SELECT * FROM User WHERE Email = ?", [email]);
        if (!user) {
            return false;
        }

        const passwordMatch = await bcrypt.compare(senha, user.Senha);

        console.log(passwordMatch);
        if (!passwordMatch) {
            return false;
        }
        return true;
    } catch (error) {
        throw error;
    }
}

