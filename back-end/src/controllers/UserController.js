import { openDb } from "../database/db.js";
import { CreateUser } from "../services/CreateUserService.js";
import { LoginUser } from "../services/LoginUserService.js";

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS User (Id INTEGER PRIMARY KEY, Nome TEXT, Email TEXT, Senha TEXT, Admin BOOLEAN)')
    })
}

export async function insertUser(user){
   await CreateUser(user);
}

export async function loginUser(email, senha) {
    await LoginUser(email, senha);
}
