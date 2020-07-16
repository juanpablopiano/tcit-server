const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	password: process.env.POSTGRES_PASSWORD,
	host: "localhost",
	post: 5432,
	database: "tcit",
});

module.exports = pool;
