
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

//const connection = mysql.createConnection({
//  host: dbConfig.HOST,
//  port: dbConfig.PORT,
//  user: dbConfig.USER,
//  password: dbConfig.PASSWORD,
//  database: dbConfig.DB
//});

// open the MySQL connection
//connection.connect(error => {
//  if (error) throw error;
//  console.log("Successfully connected to the database.");
//});

const connection = mysql.createPool({
  connectionLimit : dbConfig.pool.max,
  acquireTimeout: dbConfig.pool.acquire,
  connectTimeout: dbConfig.timeout,
  supportBigNumbers: true,
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) {
           console.error('error connecting: ' + error.stack);
           throw error;
  }
  console.log('resulat=' + results[0].solution + '. Successfully connected to the database.');
});

module.exports = connection;
