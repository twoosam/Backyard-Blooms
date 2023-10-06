-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "category" ("name", "imageUrl")
values ('Plumeria', '/images/yellow.jpg'),
('Assorted', '/images/pokey.jpg'),
('Seeds', '/images/seeds.jpg');

insert into "product" ("name", "details", "price", "imageUrl", "categoryId")
values ('Golden sunset', 'Huge blooms', '20', '/images/yellow.jpg', '1'),
('Pink', 'Fast blooms', '25', '/images/pinky.jpg', '1'),
('Pokey', 'Low maintenece succulent', '15', '/images/pokey.jpg', '2'),
('Golden sunset', '1 seed pod', '10', '/images/seeds.jpg', '3');

insert into "carousel" ("name", "imageUrl")
values ('Gnome', '/images/gnome.jpg'),
('Pinky', '/images/pinky.jpg'),
('whiteYellow', '/images/whiteYellow.jpg');

-- Dummy values for user and cart

insert into "user" ("username", "hashedPassword")
values ('anakin', 'skywalker'),
('obiwan', 'kenobi');

insert into "cart" ("userId", "productId")
values ('1', '2'),
('2', '4');


