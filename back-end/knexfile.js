import path from 'path';

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(process.cwd(), './foodexplorer.db') 
  },
  migrations: {
    directory: path.resolve(process.cwd(), 'src', 'migrations') 
  },
  useNullAsDefault: true 
};

