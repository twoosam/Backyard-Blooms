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
('Assorted', '/images/pokey.jpg');

insert into "product" ("name", "details", "price", "imageUrl", "categoryId")
values ('Golden sunset', 'Huge blooms', '20', '/images/yellow.jpg', '1'),
('Pink', 'Fast blooms', '25', '/images/pinky.jpg', '1'),
('Pokey', 'Low maintenece succulent', '15', '/images/pokey.jpg', '2');
