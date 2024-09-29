import mysql from 'mysql2/promise';
import { MYSQLDB_PASSWORD, MYSQLDB_PORT, MYSQLDB_DATABASE } from '../config';

export const azePlastDB = mysql.createPool({
  host: 'localhost',           // Ou o host apropriado, se não for localhost
  user: 'root',                // Assumindo que o usuário seja 'root'
  password: MYSQLDB_PASSWORD,  // Senha fornecida: senha_root_123
  database: MYSQLDB_DATABASE,  // Nome do banco: wefit
  port: MYSQLDB_PORT,          // Porta fornecida: 3306
  connectionLimit: 10          // Limite de conexões no pool
});

azePlastDB.getConnection()
  .then(connection => {
    console.log('Connecting to the database');
    connection.release();
  })
  .catch(err => console.error('🔴 Error connecting to the database', err));

azePlastDB.on('release', () => console.log('Connection released back to the pool'));
azePlastDB.on('error', err => console.error('🔴 Database error', err));
