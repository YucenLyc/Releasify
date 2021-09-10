require('dotenv').config()

const express = require("express");
const app = express();
const pool = require("./db");
const jwt = require('jsonwebtoken');


app.use(express.json()) //req.body

let refreshTokens = []

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '150s'
	})
};

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token === null) return res.sendStatus(401)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403)
		console.log(req.user)
		req.user = user
		next();
	})
};
// ROUTES // 

// Authenticaltion:

app.post("/token", (req, res) => {
	const refreshToken = req.body.token
	if (refreshToken === null) return res.sendStatus(401)
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userObj) => {
		if (err) return res.sendStatus(403)
		const accessToken = generateAccessToken({
			email: userObj.email
		})
		res.json({
			accessToken: accessToken
		})
	})
});

app.delete('/logout', (req, res) => {
	refreshTokens = refreshTokens.filter(token => token !== req.body.token)
	res.sendStatus(204)
})


app.post("/login", async (req, res) => {
	
	try {
		const user = await pool.query
    ('SELECT * FROM users WHERE users.email = $1 and users.password = $2', [req.body.email, req.body.password]);

		if (user.rows[0]) {
			console.log("found");
			const userObj = {
				email: req.body.email,
				password: req.body.password,
				id: user.rows[0].id
			};
			console.log(userObj)

			const accessToken = generateAccessToken(userObj);
			const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET)
			refreshTokens.push(refreshToken);
			res.json({
				accessToken: accessToken,
				refreshToken: refreshToken
			});

		} else {
			console.log("not found")
		}

	} catch (err) {
		console.log(err);
	}
});

// get a user's name & email:

app.get("/users", authenticateToken, async (req, res) => {
	let token = req.headers['authorization'].split(" ")[1];
	let decoded_token = jwt.decode(token);
	let id = decoded_token["id"];

	try {
		const user = await pool.query("SELECT name, email FROM users WHERE users.id = $1", [id]);

		res.json(user.rows[0]);
	} catch (err) {
		console.error(err.message);
	};

});

// get all the names of releases of artists an user follows:

app.get("/user/releases", authenticateToken, async(req, res) => {
	let token = req.headers['authorization'].split(" ")[1];
	let decoded_token = jwt.decode(token);
	let id = decoded_token["id"];

	try {
		const release = await pool.query("SELECT name FROM releases JOIN user_artist ON user_artist.artist_id = releases.artist_id WHERE user_id = $1", [id]);

		res.json(release.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get all artists an user follows: 

app.get("/user/artists", authenticateToken, async(req, res) => {
	let token = req.headers['authorization'].split(" ")[1];
	let decoded_token = jwt.decode(token);
	let id = decoded_token["id"];

	try {
		const artist = await pool.query("SELECT name FROM artists JOIN user_artist ON user_artist.artist_id = artists.id WHERE user_id = $1", [id]);

		res.json(artist.rows);
		
	} catch (err) {
		console.error(err.message);
	}
});

// get the releases from a user's followed list by date:

app.get("/user/releases/date", authenticateToken, async(req, res)=>{
	let token = req.headers['authorization'].split(" ")[1];
	let decoded_token = jwt.decode(token);
	let id = decoded_token["id"];

	try {
		const releaseByDate = await pool.query("SELECT name FROM releases JOIN user_artist ON user_artist.artist_id = releases.artist_id WHERE user_id = $1 AND date between '2017-01-01' and '2021-09-12';", [id]);

		res.json(releaseByDate.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// create a user:

app.post("/signup", async (req, res) => {
	try {
		const {
			name,
			email,
			password
		} = req.body;
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

app.put("/users", authenticateToken, async (req, res) => {
	let token = req.headers['authorization'].split(" ")[1];
	let decoded_token = jwt.decode(token);
	let id = decoded_token["id"];

	try {
		const {
			email
		} = req.body; 

		const updateUserInfo = await pool.query("UPDATE users SET email = $1 WHERE users.id = $2", [email, id]);

		res.json("user email was updated!");
	} catch (err) {
		console.error(err.message);
	};
});

// delete a user: 

app.delete("/users/:id", async (req, res) => {
	try {
		const {
			id
		} = req.params;
		const deleteUser = await pool.query("DELETE FROM users WHERE users.id = $1", [id]);
		res.json("user was successfully deleted!")
	} catch (err) {
		console.error(err.message);
	}
});










app.listen(3000, () => {
	console.log("server is listening on port 3000")
});