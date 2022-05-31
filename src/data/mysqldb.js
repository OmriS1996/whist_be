require("dotenv").config();
const mysql = require("mysql");
const Postgrator = require("postgrator");
const postgrator = new Postgrator({
  migrationDirectory: "./src/migrations",
  driver: "mysql",
  host: "127.0.0.1",
  port: 3306,
  database: "whist",
  username: "root",
  password: process.env.DB_PW,
  schemaTable: "whist",
});
exports.postgrator = postgrator;

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: process.env.DB_PW,
  database: "whist",
});
const query = (queryText) => {
  return new Promise((resolve, reject) => {
    pool.query(queryText, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
exports.query = query;
