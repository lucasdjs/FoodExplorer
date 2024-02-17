import express from "express";
import { insertUser, loginUser } from "../controllers/UserController.js";
import jwt from 'jsonwebtoken';
import {isUserRegistered} from '../services/CreateUserService.js'
import { DetailUserController } from "../controllers/DetailUserController.js";
import { isAuthenticated, isAdmin } from "../middlewares/isAuthenticated.js";
import multer from 'multer';

const Secret = "SecretKey";
const routes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // O diretório onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // O nome do arquivo será o mesmo que o nome original
    }
  });
  
  const upload = multer({ storage: storage });

  routes.post('/upload', upload.single('file'), function (req, res, next) {
       res.send('Arquivo enviado com sucesso');
  });
  
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

routes.post('/addDish', verifyJWT, async (req, res) => {
    try { 
        const dish = req.body;
        const image = req.file;  
        await insertDish(dish, image);

        res.json({
            "statusCode": 200,
            "message": "Prato adicionado com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            "statusCode": 500,
            "error": "Erro interno do servidor"
        });
    }
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
