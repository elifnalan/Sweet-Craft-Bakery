const mysql = require('mysql');

// Create a MySQL connection pool
// pool is for ensuring several connections can be handled at once, 
// and it will manage the connections for us

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    connectionLimit: 10,
});

db.query('SELECT 1', (err) => {
    if (err) console.error('MySQL connection error:', err);
    else console.log('Connected to MySQL database!');
});

module.exports = db;