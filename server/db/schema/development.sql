INSERT INTO users (name, email, password)
VALUES
('Lucy Zhou', 'fakeEmail1@gmail.com', 'password'),
('Jessie Zoer', 'fakeEmail2@gmail.com', 'password'),
('Mengzi William', 'fakeEmail3@gmail.com', 'password'),
('Johnathan Bang', 'fakeEmail4@gmail.com', 'password'),
('Donkey Bae', 'donkeyNotCranky@gmail.com','password');

INSERT INTO artists (name)
VALUES
('Lord Of The Lost'),
('Slipknot'),
('Spiritbox'),
('Amon Amarth'),
('Shadow Of Intent'),
('Trivium');

INSERT INTO user_artist (user_id, artist_id)
VALUES
(1, 1),
(1, 2), 
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 2), 
(2, 3),
(2, 4),
(2, 5),
(3, 2), 
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(4, 2), 
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(5, 4),
(5, 3),
(5, 1),
(5, 6);

INSERT INTO releases (artist_id, release_type_id)
VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 1),
(6, 4);

INSERT INTO release_types (type)
VALUES
('single'),
('album'),
('EP'),
('Cover'),
('Remix');

INSERT INTO notifications (user_id, release_id, notified)
VALUES
(1, 7, false),
(2, 11, false),
(3, 15, false),
(4, 17, false),
(5, 15, true);