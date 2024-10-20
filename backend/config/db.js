const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12komal00',
  database: 'books_directory',
});

db.connect((err) => {
  if (err) {
    console.error('Connection error:', err);
  } else {
    console.log('Connected successfully!');
  }
});

module.exports = db;
