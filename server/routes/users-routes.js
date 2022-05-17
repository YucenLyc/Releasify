import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router();

router.get('/',authenticateToken, async(req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json({users : users.rows})
  } catch (error){
    res.status(500).json({error:error.message})
  }
});

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //TODO: Create checkpoints for users input: name, email and password must be checked before creating a new account
    console.log("this is before the if statement")
    if(!req.body.name | !req.body.email | !hashedPassword){
      console.log("this is inside the if statement")
      return {error: "Invalid User Input"};
    }
    console.log("this is after the if statement")
    const newUser = await pool.query('INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *', [req.body.name, req.body.email, hashedPassword]);
    console.log("New User Created!")
    res.json({users: newUser.rows[0]})
  } catch (error) {
    res.status(500).json({error: error.message});
  }
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