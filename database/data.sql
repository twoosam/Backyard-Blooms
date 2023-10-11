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
values ('Plumeria', '/images/baliWhirl.jpg'),
('Assorted', '/images/pokey.jpg'),
('Seeds', '/images/seeds.jpg');

insert into "product" ("name", "details", "price", "imageUrl", "categoryId")
values ('Bali Whirl', 'Huge blooms', '20', '/images/baliWhirl.jpg', '1'),
('Jester', 'Fast blooms', '25', '/images/jester.jpg', '1'),
('Mystique', 'Blooms', '35', '/images/mystique.jpg', '1'),
('Treasure Isle', 'Blooms', '35', '/images/treasureIsle.jpg', '1'),
('Star White','blooms', '40', '/images/starWhite.jpg', '1'),
('Candy Stripe','blooms', '45', '/images/candyStripe.jpg', '1'),
('Pokey', 'Low maintenece succulent', '15', '/images/pokey.jpg', '2'),
('Bali Whirl', '1 seed pod', '10', '/images/seeds.jpg', '3');

insert into "carousel" ("name", "imageUrl")
values ('Gnome', '/images/gnome.jpg'),
('Jester', '/images/jester.jpg'),
('Star White', '/images/starWhite.jpg');



