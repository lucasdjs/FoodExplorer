import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';
import { json } from 'express';
import knex from 'knex';
import knexfile from '../knexfile.js';
import path from 'path'; // Importe o módulo path

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
