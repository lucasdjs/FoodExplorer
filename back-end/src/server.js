import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';
import { json } from 'express';
import knex from 'knex';
import knexfile from '../knexfile.js';

const app = express();
const PORT = process.env.PORT || 3000;

const db = knex(knexfile);
app.set('db', db);

app.use(express.json());
app.use(cors());
app.use(json());
app.use('/', routes);
app.use('/user', routes);

async function initialize() {
    try {
        console.log("Inicialização concluída.");
    } catch (error) {
        console.error("Erro durante a inicialização:", error);
    }
}


app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    await initialize();
});
