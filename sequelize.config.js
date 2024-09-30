require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.MYSQLDB_PORT
  },
  test: {
    username: 'root',
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.MYSQLDB_PORT
  },
  production: {
    username: 'root',
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.MYSQLDB_PORT
  }
};
