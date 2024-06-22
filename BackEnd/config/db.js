const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
  host: '34.69.231.57', // Replace with your actual MySQL server IP or hostname 34.69.231.57
  user: 'root', // Replace with your MySQL username
  password: 'F.vio4yb', // Replace with your MySQL password
  database: 'thay', // Replace with your MySQL database name
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0,
  connectTimeout: 60000, // Set connect timeout to 60 seconds
});

module.exports = mysqlPool;
