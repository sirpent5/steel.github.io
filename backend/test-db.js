const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

const testConnection = async () => {
    let connection;
    
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT // Add this line if you have a port in your .env
        });
        console.log("✅ Database connection successful!");
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

testConnection();