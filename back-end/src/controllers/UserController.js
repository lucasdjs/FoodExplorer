import { openDb } from "../database/db.js";
import { CreateUser } from "../services/CreateUserService.js";
import { LoginUser } from "../services/LoginUserService.js";

export async function insertUser(user){
   await CreateUser(user);
}

export async function loginUser(email, senha) {
   return await LoginUser(email, senha);
}
