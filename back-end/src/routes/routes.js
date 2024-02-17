import express from "express";
import { insertUser, loginUser } from "../controllers/UserController.js";
import jwt from 'jsonwebtoken';
import {isUserRegistered} from '../services/CreateUserService.js'
import { DetailUserController } from "../controllers/DetailUserController.js";
import { isAuthenticated, isAdmin } from "../middlewares/isAuthenticated.js";

const Secret = "SecretKey";
const routes = express.Router();

const verifyJWT = (req,res, next)=>{
   const token = req.headers.authorization?.split(" ")[1];
   if (!token) {
       return res.status(401).json({ message: "Token não fornecido" });
   }
   jwt.verify(token, Secret, (err, decoded) => {
       if (err) {
           return res.status(403).json({ message: "Token inválido" });
       }
       req.user = decoded;
       next();
   });
};

routes.get("/admin", isAuthenticated, isAdmin, (req, res) => {
    res.json({ message: "Bem-vindo à área administrativa" });
});

routes.get("/user", isAuthenticated, (req, res) => {
    res.json({ message: "Bem-vindo à área do usuário normal" });
});


routes.post('/addUser', async (req, res) => {
    try {
        const user = req.body;
        const userExists = await isUserRegistered(user.email);
        
        if (userExists) {
            res.status(409).json({
                "statusCode": 409,
                "error": "Usuário já existe"
            });
        }
        else{
            await insertUser(req.body);
            res.json({
                "statusCode": 200
            });
        }

       
    } catch (error) {
        res.status(500).json({
            "statusCode": 500,
            "error": "Erro interno do servidor"
        });
    }
});

routes.get('/userInfo', isAuthenticated, (req, res) => {
    const detailUserController = new DetailUserController();
    detailUserController.handle(req, res); 
});

routes.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;


        const user = await loginUser(email, senha);

        if (!user) {
            return res.status(401).json({ message: "Credenciais de login inválidas." });
        }
        const token = jwt.sign({
            sub: user.Id,
            nome:user.Nome,
            email:user.Email,
            admin: user.Admin
        }, Secret, {expiresIn: 500});

         if (user.Admin) {
            return res.status(200).json({ nome: user.Nome, email: user.Email, token: token, isAdmin: true });
        } else {
            return res.status(200).json({ nome: user.Nome, email: user.Email, token: token, isAdmin: false });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

routes.get('/user/profile', verifyJWT, (req, res) => {
    res.json({ user: req.user });
});

export default routes;
