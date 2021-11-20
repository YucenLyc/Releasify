import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password:"mysecretpassword",
  database:"releasify",
  host:"localhost",
  port:5432
});

export default pool;