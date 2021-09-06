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
(2, 4),
(2, 5),
(4, 2), 
(4, 3),
(5, 6),
(10, 6);


INSERT INTO releases (artist_id, name, release_type_id, date)
VALUES
(1, 'Judas', 1, '2020-10-09'),
(2, 'All Hope Is Gone', 1, '2019-09-07'),
(3, 'Blessed Be', 2, '2017-06-06'),
(4, 'Berserker', 3, '2021-02-13'),
(5, 'Intensified Genocide', 1, '2021-07-15'),
(6, 'Shogun', 4, '2021-08-08');

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
(2, 8, false),
(3, 12, false),
(4, 11, false),
(5, 10, true);