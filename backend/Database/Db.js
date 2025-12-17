const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",        
  user: "root",
  password: "samiran123",
  database: "leave_management"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;

