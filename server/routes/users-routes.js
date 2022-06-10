import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/authorization.js';
import bodyParser from 'body-parser';

const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());

router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json({ users: users.rows })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    if (!req.body.name | !req.body.email | !hashedPassword) {
      console.log("this is inside the if statement")
      res.json({ error: "Invalid User Input" })
    }
    
    res.json({message: 'it hit the registration route'})

    const newUser = await pool.query('INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *', [req.body.name, req.body.email, hashedPassword]);

    res.json({ users: newUser.rows[0] })
 
});

// router.post('/userInfo', async (req, res) => {
//   try{
//     const userInfo = await pool.query('SELECT * FROM users WHERE users.email = $1', [req.body.email])
//     res.json({userInfo: userInfo.rows[0]})
//     console.log(userInfo.rows[0]);
//   } catch (error) {
//     res.status(500).json({error: error.message});
//   }
// })

export default router;