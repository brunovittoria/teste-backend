import mysql from 'mysql2/promise'
import { Sequelize } from 'sequelize'
import { MYSQLDB_PASSWORD, MYSQLDB_PORT, MYSQLDB_DATABASE } from '../config'

export const weFitDBPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: MYSQLDB_PASSWORD,
  database: MYSQLDB_DATABASE,
  port: MYSQLDB_PORT,
  connectionLimit: 10
})

export const weFitDbSequelize = new Sequelize(MYSQLDB_DATABASE, 'root', MYSQLDB_PASSWORD, {
  host: 'localhost',
  port: MYSQLDB_PORT,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
})

async function checkMySQLPoolConnection() {
  try {
    const connection = await weFitDBPool.getConnection()
    console.log('Conexão com o pool MySQL obtida com sucesso')
    connection.release()
  } catch (err) {
    console.error('Erro ao conectar ao pool do MySQL:', err)
  }
}

async function checkSequelizeConnection() {
  try {
    await weFitDbSequelize.authenticate()
    console.log('Conexão com o Sequelize estabelecida com sucesso')
  } catch (err) {
    console.error('Erro ao conectar ao Sequelize:', err)
  }
}

checkMySQLPoolConnection()
checkSequelizeConnection()

export default { weFitDBPool, weFitDbSequelize }
