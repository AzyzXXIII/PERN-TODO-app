const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "11112323xxiii",
  database: "perntodo",
  port: 5432,
});
module.exports = pool;
