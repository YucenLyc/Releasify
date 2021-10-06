import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtTokens} from '../utils/jwt-helpers.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const users = await pool.query('SELECT * FROM users WHERE users.email = $1', [email]);
    if (users.rows.length === 0) return res.status(401).json({error: "email is incorrect"});
    // password check:
    const validPassword = await bcrypt.compare(password, users.rows[0].password);
    if (!validPassword) return res.status(401).json({error:"incorrect password"});

    //JWT
    let tokens = jwtTokens(users.rows[0]);//Gets access and refresh tokens
    res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none', secure: true});
    res.json(tokens);
    
    console.log("success")
  } catch (error) {
    res.status(401).json({error:error.message});
    res.redirect('login/userInfo')
  }
});

router.get('/login/userInfo', async (req, res) => {
  const {email} = req.body;
  try{
    const userInfo = await pool.query('SELECT * FROM users WHERE users.email = $1', [req.body.email])
    res.json({userInfo: userInfo.rows[0]})
    console.log(userInfo.rows[0]);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.get('/refresh_token', (req,res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null) return res.status(401).json({error:'Null refresh token'});
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error,user) => {
      if(error) return res.status(403).json({error:error.message});
      let tokens = jwtTokens(user);
      res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true, sameSite: 'none', secure: true});
      res.json(tokens);
    })
  } catch (error){
    res.status(401).json({error: error.message});
  }
});


router.delete('/refresh_token', (req,res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({message:'refresh token deleted.'})
  } catch (error){
    res.status(401).json({error: error.message});
  } 
});

export default router;