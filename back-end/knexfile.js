// knexfile.js

import path from 'path';

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(process.cwd(), './foodexplorer.db') // Usando process.cwd() para obter o diretório de trabalho atual
  },
  migrations: {
    directory: path.resolve(process.cwd(), 'src', 'migrations') // Usando process.cwd() para obter o diretório de trabalho atual
  },
  useNullAsDefault: true // Adicione essa opção para evitar o aviso sobre valores padrão em SQLite
};
