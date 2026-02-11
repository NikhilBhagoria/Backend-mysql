require('dotenv').config({ override: true });
const mysql = require("mysql2");

console.log("DB Config Check:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: `'${process.env.DB_PASSWORD}'`, // quoted to see empty string or undefined
  database: process.env.DB_NAME
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'backend_eco',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.code,);
  } else {
    console.log("✅ MySQL connection is OK");
    connection.release();
  }
});

module.exports = pool;
