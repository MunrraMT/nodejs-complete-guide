// eslint-disable-next-line import/no-extraneous-dependencies
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: 'maria',
  connectionLimit: 10,
});

module.exports = pool;
