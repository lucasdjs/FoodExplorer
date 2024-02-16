import express from 'express';
import { createTable } from './controllers/UserController.js';
import routes from './routes/routes.js';
import cors from 'cors';
import { json } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
app.use(json());
app.use('/', routes);
app.use('/user', routes);

async function initialize() {
    try {
        await createTable();
        console.log("Tabela de usuário criada com sucesso.");
    } catch (error) {
        console.error("Erro ao criar a tabela de usuário:", error);
    }
}


app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    await initialize();
});
