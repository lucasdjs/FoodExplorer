# Food Explorer

Food Explorer é uma aplicação de cardápio de restaurante desenvolvida utilizando Node.js no backend, React.js no frontend e SQLite como banco de dados.

## Funcionalidades

- Visualização do cardápio do restaurante.
- Adição, remoção e atualização de itens do cardápio.
- Pesquisa de itens por nome ou categoria.
- Interface de usuário amigável e responsiva.

## Requisitos de Instalação

- Node.js
- npm (Node Package Manager)

## Instalação

1. Clone o repositório para o seu ambiente local:

git clone https://github.com/seu-usuario/food-explorer.git


2. Navegue até o diretório do projeto:

cd foodexplorer

cd back-end
npm install


4. Volte ao diretório principal do projeto e instale as dependências do frontend:

cd ..
cd food-explorer
npm install


## Configuração do Banco de Dados
Como foi feito o projeto utilizando o type:module do nodejs, pra rodar as migrations deverá seguir os seguintes passos:
1 - remover a tag  "type": "module" do package.json
2 - ir até o arquivo knex.js e descomentar as seguintes linhas : 

// const path = require('path');

// module.exports = {
//   client: 'sqlite3',
//   connection: {
//     filename: path.resolve(process.cwd(), './foodexplorer.db') 
//   },
//   migrations: {
//     directory: path.resolve(process.cwd(), 'src', 'migrations') 
//   },
//   useNullAsDefault: true 
// };


e comentar as seguintes linha: 

import path from 'path';

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(process.cwd(), './foodexplorer.db') 
  },
  migrations: {
    directory: path.resolve(process.cwd(), 'src', 'migrations'),
    extension: 'js'
  },
  useNullAsDefault: true 
};



3 - Rodar o comando npx knex migrate:latest para gerar a migration no banco de dados

4 - Fazer o processo inverso do que foi feito, comentando essas linhas: 

// module.exports = {
//   client: 'sqlite3',
//   connection: {
//     filename: path.resolve(process.cwd(), './foodexplorer.db') 
//   },
//   migrations: {
//     directory: path.resolve(process.cwd(), 'src', 'migrations') 
//   },
//   useNullAsDefault: true 
// };


e decomentando essas: 
import path from 'path';

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(process.cwd(), './foodexplorer.db') 
  },
  migrations: {
    directory: path.resolve(process.cwd(), 'src', 'migrations'),
    extension: 'js'
  },
  useNullAsDefault: true 
};

e após isso inserir no package.json  "type": "module"


## Execução

1. Para iniciar o servidor backend, volte ao diretório raiz do projeto back-end e execute:

cd ..
cd back-end
npm run dev



2. Para iniciar o frontend, abra um novo terminal, navegue até o diretório raiz do projeto e execute:

npm run dev


3. Acesse a aplicação em seu navegador através do endereço: `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) ou enviar pull requests com melhorias.



