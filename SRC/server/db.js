const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test",
  database: "se3309",
  multipleStatements: true,
});

module.exports = con;
