//En este script se crea y se devuelve un pool de conexiones a BBDD
const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectTimeout: 100,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: 'Z',
    });
  }

  return await pool.getConnection();
};

module.exports = { getConnection };
