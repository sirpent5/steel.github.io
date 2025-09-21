// backend/server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors()); // Allows frontend requests from a different origin

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected.');
});

// API endpoint to fetch data
app.get('/api/data', (req, res) => {
    const sql = 'SELECT id, title, body FROM your_table'; // Adjust table and column names
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});