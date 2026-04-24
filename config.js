import mysql from 'mysql2';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cli_crud',
  waitForConnections: true,
  connectionLimit: 1,
  queueLimit: 0
});

export {db} 