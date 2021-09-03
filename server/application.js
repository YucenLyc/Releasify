const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const db = require("./db");

const users = require("./routes/users");
const artists = require("./routes/artists");
const user_artists = require("./routes/user_artists");
const release_types = require("./routes/release_types");
const releases = require("./routes/release");
const notifications = require("./routes/notification");


function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application(ENV) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  app.use("/api", users(db));
  app.use("/api", artists(db));
  app.use("/api", user_artists(db));
  app.use("/api", release_types(db));
  app.use("/api", releases(db));
  app.use("/api", notifications(db));
  

  
  app.use('/api/data', (req, res) => res.json({
    message: "Seems to work!",
  }));

  app.use('/api/hello', (req, res) => res.json({
    message: "Hello World!",
  }));

  if (ENV === "yucenliu" || ENV === "test") {
    Promise.all([
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
    ])
      .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              console.log("Database Reset");
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch(error => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  app.close = function() {
    return db.end();
  };

  return app;
};
