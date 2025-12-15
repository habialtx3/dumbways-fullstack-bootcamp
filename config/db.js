const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",        // username postgres
  host: "localhost",
  database: "personal_web",
  password: "password",
  port: 5432,
});

module.exports = pool;
