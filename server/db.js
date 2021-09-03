const Pool = require('pg').Pool;

const pool = new Pool({
  user: "yucenliu",
  password:"4561",
  database:"releasify",
  host:"localhost",
  port:5432
});

module.exports = pool;