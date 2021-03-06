DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS user_artist CASCADE;
DROP TABLE IF EXISTS releases CASCADE;
DROP TABLE IF EXISTS release_types CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE artists (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE user_artist (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE
);

CREATE TABLE release_types (
  id SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR(200)
);

CREATE TABLE releases (
   id SERIAL PRIMARY KEY NOT NULL,
   name VARCHAR(255) NOT NULL,
   artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
   release_type_id INTEGER REFERENCES release_types(id)ON DELETE CASCADE,
   date DATE
);


CREATE TABLE notifications (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  release_id INTEGER REFERENCES releases(id) ON DELETE CASCADE,
  notified BOOLEAN
);