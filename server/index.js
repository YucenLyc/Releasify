const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()) //req.body

// ROUTES // 

// get all users

app.get("/users", async(req, res)=> {
  try{
    const allUsers = await pool.query("SELECT * FROM users");

    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
  
});

// get all artists

app.get("/artists", async(req, res)=> {
  try{
    const allArtists = await pool.query("SELECT * FROM artists");

    res.json(allArtists.rows);
  } catch (err) {
    console.error(err.message);
  }
  
});



// create users

app.post("/users", async(req, res) => {
  try {
    const {
      name, 
      email,
      password
    } = req.body;

    const newUser = await pool.query("INSERT INTO users (name, email,password) VALUES ($1, $2, $3) RETURNING *", 
    [name, email, password]
    );
    res.json(newUser.rows[0]);
  } catch (err){
    console.error(err.message);
  }
})











app.listen(3000, () => {
  console.log("server is listening on port 3000")
});