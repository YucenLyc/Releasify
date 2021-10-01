import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: "yucenliu",
  password:"4561",
  database:"releasify",
  host:"localhost",
  port:5432
});

export default pool;