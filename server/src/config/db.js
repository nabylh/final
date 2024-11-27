import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	connectionLimit: 10, 
	queueLimit: 0, 
	waitForConnections: true, 
});

 pool.getConnection()
.then((connection) => {
console.log("Connected to DB ", connection.config.database);
connection.release();
})
.catch((err) => {
console.log("Error connecting to DB: ", err);
});

export default pool;

