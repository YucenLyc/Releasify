const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()) //req.body

// ROUTES // 

// get all users:

app.get("/users", async(req, res)=> {
  try{
    const allUsers = await pool.query("SELECT * FROM users");

    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
  
});
// get a user's name & email:
app.get("/users/:id", async(req, res)=> {
  const { id } = req.params;
  try{
    const user = await pool.query("SELECT name, email FROM users WHERE users.id = $1", [id]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  };
});

// get all artists

app.get("/artists", async(req, res)=> {
  try{
    const allArtists = await pool.query("SELECT * FROM artists");

    res.json(allArtists.rows);
  } catch (err) {
    console.error(err.message);
  };
});

// get the name of an artist:

app.get("/artists/:id", async(req, res)=> {
  const { id } = req.params;
  try{
    const artist = await pool.query("SELECT * FROM artists WHERE artists.id = $1", [id]);

    res.json(artist.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


// create a user:

app.post("/users", async(req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", 
    [name, email, password]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message)
  };
});

// update an user email:

app.put("/users/:id", async (req, res)=> {
  try{
    const { id } = req.params; 
    const { email } = req.body; //SET 

    const updateUserInfo = await pool.query("UPDATE users SET email = $1 WHERE users.id = $2", [email, id]);
    
    res.json("user email was updated!");
  } catch (err){
    console.error(err.message);
  };
});

// delete a user: 

app.delete("/users/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE users.id = $1", [id]);
    res.json("user was successfully deleted!")
  } catch (err) {
    console.error(err.message);
  }
});










app.listen(3000, () => {
  console.log("server is listening on port 3000")
});